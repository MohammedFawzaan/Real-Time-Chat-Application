import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getAllChats, sendMessages, getMessages } from "../controllers/message.controller.js";

const router = Router();

router.get('/chats', authMiddleware, getAllChats);

router.get('/get/:id', authMiddleware, getMessages);

router.post('/send/:id', authMiddleware, sendMessages);

export default router;