const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
    name: String,
    numberDay: Number,
    endTimeRegister: Number,
    endTimeCourse: Number,
    price: Number,
    dayTime: Date
});

module.exports = mongoose.model("Member", memberSchema);