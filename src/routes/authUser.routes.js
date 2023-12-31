import { Router } from "express";
import { loginUser, logoutUser, loadUser } from "../controllers/authUser.controller.js";
import { authRequired , refresh } from "../middlewares/validateUserToken.js";

//Zod
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { loginUserSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/loginUser",validateSchema(loginUserSchema),loginUser);
router.post("/loadUserToken",refresh,loadUser);
router.post("/logoutUser",authRequired,logoutUser);

export default router;

