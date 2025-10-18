import { Router } from "express";
import { sampleGet, samplePost } from "../controllers/sample.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/sample', authMiddleware, sampleGet);

router.post('/addName', authMiddleware, samplePost);

export default router;