import { user } from "../models/user.model";

export const createUser = (req,res) => {
    const {
        username,
        password,
        fullname,
        email,
        hierarchy,
        specialty,
        birthday
    } = req.body;

    const newUser = new user ({
        username,
        password,
        fullname,
        email,
        hierarchy,
        specialty,
        birthday
    });

};