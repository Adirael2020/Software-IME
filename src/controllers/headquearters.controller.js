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
    try {
        const headquearters = await headquearter.find();
        res.json(headquearters);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      };
};
//Obtener una sede
export const getHeadquearter = async (req,res) => {
    try {
        const headquearterFind = await headquearter.findById(req.params.id);
        if (!headquearterFind) return res.status(404).json({ message: "Headquearter not found" });
        return res.json(headquearterFind);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};
//Modificar Une Sede
export const editHeadquearters = async (req,res) => {
    try {
        const {name, direction , abbreviation} = req.body;
        const headquearterUpdated = await headquearter.findOneAndUpdate(
          { _id: req.params.id },
          { name, direction , abbreviation },
          { new: true }
        );
        return res.json(headquearterUpdated);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};
//Eliminar una Sede
export const deleteHeadquearters = async (req,res) => { 
    try {
        const deletedHeadquearter = await headquearter.findByIdAndDelete(req.params.id);
        if (!deletedHeadquearter) return res.status(404).json({ message: "Headquearter not found" });
        return res.sendStatus(204);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};