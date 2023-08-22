import bcrypt from 'bcryptjs';
import { user } from "../models/user.model";

//Crear usuario
export const createUser = async(req,res) => {
    const {
        username,
        password,
        fullname,
        email,
        hierarchy,
        specialty,
        birthday
    } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        const isActive = true;
        const newUser = new user ({
            username,
            password: passwordHash,
            fullname,
            email,
            hierarchy,
            isActive,
            specialty,
            birthday
        });
        await newUser.save();
        res.json({
            message: "Usuario Cargado Correctamente"
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    };
};

//Obtener usuarios
//obtener un usuario
//editar usuario
//Activar Usuario
//Desactivar Usuario