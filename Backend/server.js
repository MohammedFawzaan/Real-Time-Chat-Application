import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDb from './db/db.js';
import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';
import userModel from './models/user.model.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
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
    origin: ["https://real-time-chat-application-cyan-gamma.vercel.app", "http://localhost:5173"],
    credentials: true,
  },
});

// Connect DB
connectToDb();

// Important for deployment - reverse proxy.
app.set('trust proxy', 1);

// ✅ CORS
app.use(cors({
  origin: ["https://real-time-chat-application-cyan-gamma.vercel.app", "http://localhost:5173"],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport
app.use(passport.initialize());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`
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