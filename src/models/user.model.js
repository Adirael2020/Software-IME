import mongoose from "mongoose";

//Usuarios (Administrativo/pedagogico)
const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,    
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    hierarchy: {
        type: String,
    },
    isActive: Boolean,
    specialty: [specialty],
    birthday: {
        type: Date
    },
});

// Materias que da cada profesor
const specialtySchema = mongoose.Schema({
    name: String
});

//Sueldos
 

//Exports
export const user = mongoose.model('User',userSchema);
export const specialty = mongoose.model('Specialty', specialtySchema);