import mongoose from "mongoose";

//Sedes
const headquearterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    direction: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    abbreviation: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: 3
    },
});

//Relacion con usuarios
const usersHerdqueartersSchema = new mongoose.Schema({
    headquearter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Headquearter'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
});


//exports
export const usersHeadquearters = mongoose.model('UsersHeadquearters', usersHerdqueartersSchema);
export const headquearter = mongoose.model('Headquearter', headquearterSchema);