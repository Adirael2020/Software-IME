import { Router } from "express";
import { loginUser } from "../controllers/authUser.controller.js";

const router = Router();

router.post("/loginUser",loginUser);

export default router

