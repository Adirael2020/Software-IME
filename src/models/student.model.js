import mongoose from "mongoose";
import { headquearter } from "./headqueater.model";

//Estudiante
const studentSchema = new mongoose.Schema({
    idstudent: {
        type: Number,
        unique: true
    },
    namesStudent: {
        type: String,
        required: true,
    },
    lastNameStudent: {
        type: String,
        required: true,
    },
    stateStudent: {
        type: String
    },
    DNI: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    headquearter: [headquearter],
    signature: Boolean,
    regulation: Boolean,
    photo4x4: Boolean,
    titleStudent: String,
    documentStudent: Boolean,
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    birthday: {
        type: Date
    },
    direction: String,
    phone: {
        type: Number,
        required: true
    },
    emergencyPhone: [],
    bloodType: String,
    infoMedical: String,
    observation: String,
    isRegister: Boolean,
    password: String,
    hierarchy: {
        type: String,
    },
});

//otras relaciones


//Export
export const student = mongoose.model('Student', studentSchema);