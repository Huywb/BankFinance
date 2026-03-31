import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    state: { type: String },
    city: { type: String },
    postalCode: { type: String },
    dateOfBirth: { type: Date },
    ssn: { type: String },
    dwollaCustomerUrl : { type: String, default: '' },
    dwollaCustomerId : { type: String, default: '' },
    refreshToken: { type: String },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema) 


