import { Router } from "express";

import { createUser, getUsers } from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateUserToken.js";

//Zod
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const router = Router();

//get all
router.get("/getUsers",authRequired,getUsers);
//create
router.post("/createUser",authRequired,createUser);


export default router