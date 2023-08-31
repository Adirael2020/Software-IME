import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/authUser.controller.js";

//Zod
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { loginUserSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/loginUser",validateSchema(loginUserSchema),loginUser);
router.post("/logoutUser",logoutUser);

export default router;

