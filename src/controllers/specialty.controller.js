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

}
//GetAll
export const getSpecialties = async (req,res) =>{
    try {
        const specialties = await specialty.find();
        res.json(specialties);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      };
}
//Edit
//update
//Delete