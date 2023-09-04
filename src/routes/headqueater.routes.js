import { Router } from "express";
import { createHeadquearter, getHeadquearters } from "../controllers/headquearters.controller.js";
import { authRequired } from "../middlewares/validateUserToken.js";

const router = Router();

router.get('/headquearters',authRequired,getHeadquearters);
router.post('/createHeadquearter',authRequired,createHeadquearter);


export default router