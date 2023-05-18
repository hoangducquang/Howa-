const mongoose = require('mongoose');
const { update } = require('../controllers/userController');
const { Int32, Timestamp } = require('mongodb');
var ObjectId = mongoose.Schema.ObjectId;
var Schema = mongoose.Schema;

var account = new mongoose.Schema({
    id:{
        type: ObjectId,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    update_at:{
        type: Date,
        default: Date.now
    },
    create_at:{
        type: Date,
        default: Date.now
    },
    delete_at:{
        type: Date,
        default: Date.now
    },
    type:{
        type: Number,
        required: true
    },
    users_id:{
        type: ObjectId,
        required: true,
        unique: true
    }
});

const accountDB = mongoose.model('accounts', account);

module.exports = accountDB;
