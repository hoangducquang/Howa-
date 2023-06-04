const mongoose = require('mongoose');
const { update } = require('../controllers/userController');
const { Int32, Timestamp } = require('mongodb');
var ObjectId = mongoose.Schema.ObjectId;
var Schema = mongoose.Schema;

var orders = new mongoose.Schema({
    id:{
        type: ObjectId,
        // required: true,
        unique: true
    },
    courses_id:{
        type: String,
        required: true,
    },
    create_at:{
        type: String,
        required: true
    },
    users_id:{
        type: String,
        required: true
    },
    canceled:{
        type: Boolean,
        required: true
    }
});

const ordersDB = mongoose.model('ordersdbs', orders);


module.exports = ordersDB;