import { Router } from "express";
import { sample } from "../controllers/sample.controller.js";

const router = Router();

router.get('/sample', sample);

export default router;