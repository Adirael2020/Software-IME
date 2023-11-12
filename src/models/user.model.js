import mongoose from "mongoose";

// Materias que da cada profesor
const specialtySchema = new mongoose.Schema({
    name: String
});
export const specialty = mongoose.model('Specialty', specialtySchema);


//Usuarios (Administrativo/pedagogico)
const userSchema = new mongoose.Schema({
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
    isTeacher: Boolean,
    specialty: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty' // Esto hace referencia al modelo de especialidades
      }],
    birthday: {
        type: Date
    },
    photo_user: {
        type: String,
    },
});
export const user = mongoose.model('User',userSchema);
