import { Router } from "express";
import { googleAuthCallBack, getUserData, logout } from "../controllers/user.controller.js";
import passport from "passport";
import {authMiddleware} from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/callback', passport.authenticate('google', { session: false }), googleAuthCallBack);

router.post('/auth/logout', logout);

router.get('/auth/check', authMiddleware, getUserData);

export default router;