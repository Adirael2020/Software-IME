import { headquearter } from "../models/headqueater.model.js";

//Crear
export const createHeadquearter = async (req,res) => {
    const {name, direction , abbreviation} = req.body;
    try {
        const newHeadquearter = new headquearter({
            name,
            direction,
            abbreviation
        });
        newHeadquearter.save();
        res.send("Creado");
    } catch (error) {
        console.log(error);
    };
};
//Obtener todas las sedes
export const getHeadquearters = async (req,res) => {

};
//Obtener una sede
export const getHeadquearter = async (req,res) => {

};
//Modificar Une Sede
export const editHeadquearters = async (req,res) => {

};
//Eliminar una Sede
export const deleteHeadquearters = async (req,res) => {

};