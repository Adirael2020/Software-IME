import mongoose from "mongoose";
import {MONGO_DB} from './config.js'

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_DB);
        console.log('>>>>DB is connect');
    } catch (error) {
        console.log(error);
    };
};
