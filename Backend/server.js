import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDb from './db/db.js';
import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';
import userModel from './models/user.model.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

//🔹Setup HTTP + Socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // your local frontend
    credentials: true,
  },
});

// Connect DB
connectToDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS
app.use(cors({
  origin: ["http://localhost:5173"], // frontend URL
  credentials: true
}));

// ✅ Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://real-time-chat-application-vztk.onrender.com/users/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await userModel.findOne({ googleId: profile.id });
    if (!user) {
      user = await userModel.create({
        username: {
          firstname: profile.name.givenName,
          lastname: profile.name.familyName
        },
        email: profile.emails[0].value,
        googleId: profile.id,
        status: "online"
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

// Routes
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

// ✅ Socket.io
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// Start server
server.listen(port, () => console.log(`🚀 Server running on port ${port}`));