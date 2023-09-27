import { Router } from "express";
import { createSpeciality } from "../controllers/specialty.controller.js";
import { authRequired } from "../middlewares/validateUserToken.js";

//Zod
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { specialtySchema } from "../schemas/sepecialty.schema.js";

const router = Router();

//add
router.post("/addSpecialty",authRequired,validateSchema(specialtySchema),createSpeciality);
//get all
router.get("/getSpecialtys",authRequired);
//get
router.post("/getSpecialty/:id",authRequired);
//edit
router.post("/editSpecialty/:id",authRequired,validateSchema(specialtySchema));
//delete
router.delete("deleteSpecialty/:id",authRequired);

export default router;