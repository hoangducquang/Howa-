const mongoose = require('mongoose');
const { update } = require('../controllers/userController');
const { Int32, Timestamp } = require('mongodb');
var ObjectId = mongoose.Schema.ObjectId;
var Schema = mongoose.Schema;

var categoryList = new mongoose.Schema({
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

const categoryDB = mongoose.model('categories', categoryList);

module.exports = categoryDB;