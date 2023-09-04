import { Router } from "express";
import { createHeadquearter, getHeadquearters, getHeadquearter, deleteHeadquearters, editHeadquearters} from "../controllers/headquearters.controller.js";
import { authRequired } from "../middlewares/validateUserToken.js";

//Zod
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { headquearterSchema } from "../schemas/headquearter.schema.js";

const router = Router();

//Obtener todas
router.get('/headquearters',authRequired,getHeadquearters);
//Obtener una
router.get('/headquearter/:id',authRequired,getHeadquearter);
//Crear
router.post('/createHeadquearter',authRequired,validateSchema(headquearterSchema),createHeadquearter);
//Borrar
router.delete('/deleteHeadquearter/:id',authRequired,deleteHeadquearters);
//Actualizar
router.put('/editHeadquearters/:id',authRequired,validateSchema(headquearterSchema),editHeadquearters);

export default router;