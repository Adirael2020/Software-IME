import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js';


export const authRequired = (req,res,next) =>{
    const token = req.cookies['next-auth.session-token'];
    if(!token) return res.status(401).json({message : "Unauthorized"});
    next();
};

export const refresh = async(req,res,next) =>{
    const token = req.cookies['next-auth.session-token'];
    if(!token) return res.status(401).json({message : "Unauthorized"});
    const {user} = req.body;
    req.user = user;
    next();
}