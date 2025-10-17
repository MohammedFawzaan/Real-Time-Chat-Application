import { Router } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        const user = req.user;
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
            maxAge: 5 * 24 * 60 * 60 * 1000
        });
        res.redirect(`http://localhost:5173/google-success?token=${token}`);
    }
);

router.get('/logout', (req, res, next) => {
    req.logOut((error) => {
        if(error) return next(error);
        res.clearCookie('token');
        res.json({ message: 'Logged Out' });
    });
});

export default router;