import bcrypt from 'bcryptjs';
import { user } from "../models/user.model";
import { createAccessToken } from '../libs/jwt.js';

export const loginUser = async(req,res) => {
    const {username, password} = req.body;

    try {
        const userFound = await user.findOne({username});       
        if (!userFound) return res.status(400).json({message: "invalid credentials"});

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({message: "invalid credentials"})
        
        if(!userFound.isActive) return res.status(400).json({message: "User is not Active"});

        const token = await createAccessToken({id: userFound._id});

        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            fullname: userFound.fullname,
            email: userFound.email,
            hierarchy: userFound.hierarchy,
            specialty: userFound.specialty
        })
    } catch (error) {
        
    }
};