import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://matiasgramajo78:ime5878@imesoft.5zynpay.mongodb.net/?retryWrites=true&w=majority');
        console.log('>>>>DB is connect');
    } catch (error) {
        console.log(error);
    };
};
