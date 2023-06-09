const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOTPSchema = new Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date
})

const userOTPVerification = mongoose.model(
    "userOTPVerification",
    userOTPSchema
);

module.exports = userOTPVerification;