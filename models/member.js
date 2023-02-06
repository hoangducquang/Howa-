const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String, 
    wallet: String, 
    dayTime: Date,
    pay: Boolean 
});

module.exports = mongoose.model("Member", memberSchema);