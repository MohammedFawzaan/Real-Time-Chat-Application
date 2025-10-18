import { Router } from "express";
import { googleAuthCallBack, logout } from "../controllers/user.controller.js";
import passport from "passport";

const router = Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleAuthCallBack);

router.get('/auth/logout', logout);

export default router;