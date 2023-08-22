import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/authUser.controller.js";

const router = Router();

router.post("/loginUser",loginUser);
router.post("/logoutUser",logoutUser);

export default router

