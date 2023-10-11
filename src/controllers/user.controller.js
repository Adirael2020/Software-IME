import bcrypt from 'bcryptjs';
import { user, specialty } from "../models/user.model.js";
import { usersHeadquearters } from '../models/headqueater.model.js';

//create User
export const createUser = async (req, res) => {
    const {
        username,
        password,
        fullname,
        email,
        hierarchy,
        specialty,
        birthday,
        headquearters: headqueartersFromUser
    } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10); //encriptacion de la clave
        const isActive = true; //usuario activado en sistema
        //Creacion del nuevo usuario
        const newUser = new user({
            username,
            password: passwordHash,
            fullname,
            email,
            hierarchy,
            isActive,
            specialty,
            birthday
        });
        //relacion muchos a muchos de sedes con usuarios
        headqueartersFromUser.forEach(headquearterID => {
            const newLinks = new usersHeadquearters({
                headquearter: headquearterID,
                user: newUser._id
            });
            newLinks.save(); //Guardar el link en mongo
        });
        await newUser.save(); //Guardar el Usuario en mongo
        res.json({
            message: "Usuario Cargado Correctamente"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

//get All Users
export const getUsers = async (req, res) => {
    try {
        const users = await user.find({}, { password: 0 });
        const usersWithSedes = await Promise.all(
            users.map(async (user) => {
                const userSedes = await usersHeadquearters
                    .find({ user: user._id })
                    .populate('headquearter')
                    .exec();
                const userWithSedes = {
                    ...user.toObject(),
                    headquearters: userSedes.map((headquearters) => headquearters.headquearter),
                };
                return userWithSedes;
            }
            )
        )

        res.json(usersWithSedes)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
//obtener un usuario
//editar usuario
//Activar Usuario
//Desactivar Usuario 