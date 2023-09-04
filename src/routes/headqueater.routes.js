import { Router } from "express";
import { createHeadquearter, getHeadquearters, getHeadquearter, deleteHeadquearters, editHeadquearters} from "../controllers/headquearters.controller.js";
import { authRequired } from "../middlewares/validateUserToken.js";

const router = Router();

//Obtener todas
router.get('/headquearters',authRequired,getHeadquearters);
//Obtener una
router.get('/headquearter/:id',authRequired,getHeadquearter);
//Crear
router.post('/createHeadquearter',authRequired,createHeadquearter);
//Borrar
router.delete('/deleteHeadquearter/:id',authRequired,deleteHeadquearters);
//Actualizar
router.put('/editHeadquearters/:id',authRequired,editHeadquearters);

export default router;