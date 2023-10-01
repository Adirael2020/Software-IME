import { Router } from "express";
import { createSpeciality, getSpecialties, deleteSpecialty, getSpeciality,editSpecialty } from "../controllers/specialty.controller.js";
import { authRequired } from "../middlewares/validateUserToken.js";

//Zod
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { specialtySchema } from "../schemas/sepecialty.schema.js";

const router = Router();

//add
router.post("/createSpecialty",authRequired,validateSchema(specialtySchema),createSpeciality);
//get all
router.get("/getSpecialties",authRequired,getSpecialties); 
//get
router.post("/getSpecialty/:id",authRequired,getSpeciality);
//edit
router.put("/editSpecialty/:id",authRequired,validateSchema(specialtySchema),editSpecialty);
//delete
router.delete("/deleteSpecialty/:id",authRequired,deleteSpecialty);

export default router;