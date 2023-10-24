import { Router } from "express";

import { createUser, getUsers, resetPassword, activateUser,deactivateUser, getUser, editUser } from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateUserToken.js";

//Zod
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const router = Router();

//get all
router.get("/getUsers",authRequired,getUsers);
//create
router.post("/createUser",authRequired,createUser);
//get user
router.post("/getUser/:id",authRequired,getUser);
//edit user
router.put("/editUser/:id",authRequired, editUser);
//active user
router.put("/activateUser/:id",authRequired,activateUser);
//deactivate user
router.put("/deactivateUser/:id",authRequired,deactivateUser);
//reset password user
router.put("/resetPassword/:id",authRequired,resetPassword);
//edit password user
router.put("/editPasswordUser",authRequired);


export default router