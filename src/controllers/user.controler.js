import { user } from "../models/user.model";

//Crear usuario
export const createUser = (req,res) => {
    const {
        username,
        password,
        fullname,
        email,
        hierarchy,
        specialty,
        birthdayC
    } = req.body;
    try {
        const isActive = true;
        const newUser = new user ({
            username,
            password,
            fullname,
            email,
            hierarchy,
            isActive,
            specialty,
            birthday
        });
        const userCreate = newUser.save();
        res.json(userCreate);
    } catch (error) {
        console.log(error);
        res.status(404);
    };
};

//Obtener usuarios
//obtener un usuario
//editar usuario
//Activar Usuario
//Desactivar Usuario