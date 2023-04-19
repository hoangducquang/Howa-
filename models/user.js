const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var userAccount = new mongoose.Schema({
    id:{
        type: ObjectId,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: false
    }
})

const userDB = mongoose.model('users', userAccount);

module.exports = userDB;