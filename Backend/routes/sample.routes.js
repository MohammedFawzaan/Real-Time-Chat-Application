import { Router } from "express";
import { sampleGet, samplePost } from "../controllers/sample.controller.js";

const router = Router();

router.get('/sample', sampleGet);

router.post('/addName', samplePost);

export default router;