import { Router } from "express";
import { createHeadquearter } from "../controllers/headquearters.controller.js";

const router = Router();

router.get('/headquearters')
router.post('/createHeadquearter',createHeadquearter);


export default router