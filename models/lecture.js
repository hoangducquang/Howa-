const mongoose = require('mongoose');
const { update } = require('../controllers/userController');
const { Int32, Timestamp } = require('mongodb');
var ObjectId = mongoose.Schema.ObjectId;
var Schema = mongoose.Schema;

var lectureList = new mongoose.Schema({
    id:{
        type: ObjectId,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
});

const lectureDB = mongoose.model('lectures', lectureList);

module.exports = lectureDB;