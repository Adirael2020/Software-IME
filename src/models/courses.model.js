import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    name: String,
    duration: Number,
    totalvalue: Number,
    membership: Number,
    cashPayment: Number,
    cardPayment: Number,
    debtorPayment1: Number,
    debtorPayment2: Number,
    debtorPayment3: Number,
});

export const course = mongoose.model('Course',courseSchema);