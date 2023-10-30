import bcrypt from "bcryptjs";
import { user } from "../models/user.model.js";
import { usersHeadquearters } from "../models/headqueater.model.js";
import { createAccessToken } from "../libs/jwt.js";

//Login para todo lo que son usuarios como administrativos, gerencia, profesores

//Iniciar sesion
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await user.findOne({ username });
    if (!userFound)
      return res.status(400).json({ message: "invalid credentials" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid credentials" });

    if (!userFound.isActive)
      return res.status(400).json({ message: "User is not Active" });

    const token = await createAccessToken({ id: userFound._id });
    const userSedes = await usersHeadquearters
      .find({ user: userFound._id })
      .populate("headquearter")
      .exec();
    const userWithSedes = {
      ...userFound.toObject(),
      headquearters: userSedes.map(
        (headquearters) => headquearters.headquearter
      ),
    };
    res.cookie("token", token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      fullname: userFound.fullname,
      email: userFound.email,
      headquearter: userWithSedes.headquearters,
      hierarchy: userFound.hierarchy,
      specialty: userFound.specialty,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Cerrar sesion
export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

//Recarga Sesion
export const loadUser = async (req, res) => {
  const id = req.user;
  try {
    const userFound = await user.findOne({ _id: id });
    if (!userFound)
      return res.status(400).json({ message: "invalid credentials" });
    if (!userFound.isActive)
      return res.status(400).json({ message: "User is not Active" });
    const userSedes = await usersHeadquearters
      .find({ user: userFound._id })
      .populate("headquearter")
      .exec();
    const userWithSedes = {
      ...userFound.toObject(),
      headquearters: userSedes.map(
        (headquearters) => headquearters.headquearter
      ),
    };
    res.json({
      id: userFound._id,
      username: userFound.username,
      fullname: userFound.fullname,
      email: userFound.email,
      headquearter: userWithSedes.headquearters,
      hierarchy: userFound.hierarchy,
      specialty: userFound.specialty,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
