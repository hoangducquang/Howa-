const mongoose = require('mongoose');
const { update } = require('../controllers/userController');
const { Int32, Timestamp } = require('mongodb');
var ObjectId = mongoose.Schema.ObjectId;
var Schema = mongoose.Schema;

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
    },
    update_at:{
        type: Date,
        default: Date.now
    }
});

const userDB = mongoose.model('users', userAccount);

module.exports = userDB;
