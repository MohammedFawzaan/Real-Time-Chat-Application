import express from 'express';
import cors from 'cors';
import sampleRoutes from './routes/sample.routes.js';
import dotenv from 'dotenv';
import connectToDb from './db/db.js';
import user from './models/user.model.js';
import userRoutes from './routes/user.routes.js';

import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

connectToDb();

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/auth/google/callback' 
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let User = await user.findOne({ googleId: profile.id });
        if(!User) {
            User = await user.create({
                username: {
                    firstname: profile.name.givenName,
                    lastname : profile.name.familyName
                },
                email: profile.emails[0].value,
                googleId: profile.id,
                status: "online"
            });
        }
        return done(null, User);
    } catch (error) {
        return done(error, null);
    }
}));

// Save the loggedIn user in Session
passport.serializeUser((User, done) => {
    done(null, User._id);
});

// Get(Retrieval) the user from Session
passport.deserializeUser(async (id, done) => {
    const User = await user.findById(id);
    done(null, User);
});

app.use('/api', sampleRoutes);
app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`Server Listening at ${port}`);
});