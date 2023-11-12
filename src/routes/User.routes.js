import { Router } from "express";

import { createUser, getUsers, resetPassword, activateUser,deactivateUser, getUser, editUser, editProfile, editPasswordProfile} from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateUserToken.js";

//Zod
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { userSchema,editPasswordUserSchema,editUserSchema } from "../schemas/user.schema.js";

const router = Router();

//get all
router.get("/getUsers",authRequired,getUsers);
//create
router.post("/createUser",authRequired,validateSchema(userSchema),createUser);
//get user
router.post("/getUser/:id",authRequired,getUser);
//edit user
router.put("/editUser/:id",authRequired,validateSchema(editUserSchema),editUser);
router.put("/editProfileUser/:id",authRequired,validateSchema(editUserSchema),editProfile);
//active user
router.put("/activateUser/:id",authRequired,activateUser);
//deactivate user
router.put("/deactivateUser/:id",authRequired,deactivateUser);
//reset password user
router.put("/resetPassword/:id",authRequired,resetPassword);
//edit password user
router.put("/editPassword/:id",authRequired,validateSchema(editPasswordUserSchema),editPasswordProfile);


export default router