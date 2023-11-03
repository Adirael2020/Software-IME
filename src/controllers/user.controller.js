import bcrypt from "bcryptjs";
import { user, specialty } from "../models/user.model.js";
import { usersHeadquearters } from "../models/headqueater.model.js";

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
    headquearters: headqueartersFromUser,
    isTeacher,
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
      birthday,
      isTeacher,
    });
    //relacion muchos a muchos de sedes con usuarios
    headqueartersFromUser.forEach((headquearterID) => {
      const newLinks = new usersHeadquearters({
        headquearter: headquearterID,
        user: newUser._id,
      });
      newLinks.save(); //Guardar el link en mongo
    });
    await newUser.save(); //Guardar el Usuario en mongo
    res.json({
      message: "Usuario Cargado Correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//edit User
export const editUser = async (req, res) => {
  const {
    username,
    fullname,
    email,
    hierarchy,
    specialty,
    birthday,
    isTeacher,
    headquearters: headqueartersFromUser,
  } = req.body;
  const _id = req.params.id;
  try {
    await user.findOneAndUpdate(
      { _id },
      { username, fullname, email, hierarchy, specialty, birthday, isTeacher },
      { new: true }
    );

    await usersHeadquearters.deleteMany({ user: _id }   );
    headqueartersFromUser.forEach((headquearterID) => {
      const newLinks = new usersHeadquearters({
        headquearter: headquearterID,
        user: _id,
      });
      newLinks.save(); //Guardar el link en mongo
    });

    res.json({
      message: "Usuario Guardado Correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const editProfile = async (req,res) => {
  const {fullname, email, birthday} = req.body;
  const _id = req.params.id;
  try {
    await user.findOneAndUpdate(
      { _id },
      { fullname, email, birthday},
      { new: true }
    );
    res.json({
      message: "Usuario Editado Correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await user.find({}, { password: 0 });
    const usersWithSedes = await Promise.all(
      users.map(async (user) => {
        const userSedes = await usersHeadquearters
          .find({ user: user._id })
          .populate("headquearter")
          .exec();
        const userWithSedes = {
          ...user.toObject(),
          headquearters: userSedes.map(
            (headquearters) => headquearters.headquearter
          ),
        };
        return userWithSedes;
      })
    );

    res.json(usersWithSedes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//get user
export const getUser = async (req, res) => {
  try {
    const userFind = await user.findOne(
      { _id: req.params.id },
      { password: 0 }
    );
    if (!userFind) return res.status(404).json({ message: "user not found" });
    const userSedes = await usersHeadquearters
      .find({ user: userFind._id })
      .populate("headquearter")
      .exec();
    const userWithSedes = {
      ...userFind.toObject(),
      headquearters: userSedes.map(
        (headquearters) => headquearters.headquearter
      ),
    };
    return res.json(userWithSedes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

//reset pasword
export const resetPassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const newPassword = "ime123";
    const userFound = await user.findById(userId);
    if (!userFound) {
      return res.status(404).json({ message: "User not Found" });
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    userFound.password = passwordHash;
    await userFound.save();
    res.status(200).json({ message: "Password Reset" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//Edit pasword profile
export const editPasswordProfile = async (req,res) => {
  try {
    const {currentPassword, newPassword, retryNewPassword} = req.body;
    const _id = req.params.id;
  
    const userFound = await user.findOne({_id});
    console.log(userFound);
    res.json({message:"Contraseña Actualizada"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//deactivate user
export const deactivateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userFound = await user.findById(userId);
    if (!userFound) {
      return res.status(404).json({ message: "User not Found" });
    }
    userFound.isActive = false;
    await userFound.save();
    res.status(200).json({ message: "User Deactivate" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//active user
export const activateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userFound = await user.findById(userId);
    if (!userFound) {
      return res.status(404).json({ message: "User not Found" });
    }
    userFound.isActive = true;
    await userFound.save();
    res.status(200).json({ message: "User Deactivate" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
