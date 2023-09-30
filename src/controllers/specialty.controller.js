import { specialty } from "../models/user.model.js";

//Create
export const createSpeciality = async (req,res) =>{
    const {name} = req.body;
    try {
        const newSpeciality = new specialty({
            name
        });
        await newSpeciality.save(); 
        res.json({
            message: "Especialidad Cargada Correctamente"
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
//Get
export const getSpeciality = async (req,res) =>{
    try {
        const specialtyFind = await specialty.findById(req.params.id);
        if (!specialtyFind) return res.status(404).json({ message: "Specialty not found" });
        return res.json(specialtyFind);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      };
};
//GetAll
export const getSpecialties = async (req,res) =>{
    try {
        const specialties = await specialty.find();
        res.json(specialties);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      };
};
//Edit
export const editSpecialty = async (req,res) =>{
    try {
        const {name} = req.body;
        const specialtyUpdated = await specialty.findOneAndUpdate(
          { _id: req.params.id },
          { name },
          { new: true }
        );
        return res.json(specialtyUpdated);  
    } catch (error) {
        return res.status(500).json({message:error.message});
    };
};
//Delete
export const deleteSpecialty = async (req,res) =>{
    try {
        const deletedSpecialty = await specialty.findByIdAndDelete(req.params.id);
        if (!deletedSpecialty) return res.status(404).json({ message: "Specialty not found" });
        return res.sendStatus(204);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};