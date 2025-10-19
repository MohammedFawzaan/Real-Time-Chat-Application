import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDb from './db/db.js';
import userRoutes from './routes/user.routes.js';
import userModel from './models/user.model.js';
import messageRoutes from './routes/message.routes.js';

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT;
connectToDb();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Create Session with Cookie.
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/users/auth/google/callback'
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
            user.save();
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

// Serialize user (save the userId into session).
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user (retrieval of user info from session).
passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
});

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

app.listen(port, () => {
    console.log(`Server Listening at ${port}`);
});