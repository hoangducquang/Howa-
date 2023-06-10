const mongoose = require('mongoose');
const lectureDB = require("../models/lecture");
const { update } = require('../controllers/userController');
const { Int32, Timestamp } = require('mongodb');
var ObjectId = mongoose.Schema.ObjectId;
var Schema = mongoose.Schema;

var courseList = new mongoose.Schema({
    id: {
        type: ObjectId,
        // required: true,
        unique: true
    },
    categories_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lectures_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        integer: true
    },
    old_price: {
        type: Number,
        required: true,
        integer: true
    },
    num_days: {
        type: Number,
        required: true,
        integer: true
    },
    end_date: {
        type: Date,
        required: true,
    },
    start_date: {
        type: Date,
        required: true
    },
    end_regist: {
        type: Date,
        required: true
    },
    create_at: {
        type: Date,
        required: true
    },
    delete_at: {
        type: Date,
        required: false
    },
    update_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    image: {
        type: String,
        required: true
    },
    users_id: {
        type: String,
        required: true
    },
    withdraw: {
        type: Boolean,
        default: false
    },
});

const courseDB = mongoose.model('courses', courseList);

// courseDB.aggregate([
//     {
//         $lookup: {
//             from: 'lectures',
//             localField: '_id',
//             foreignField: 'lectures_id',
//             as: 'lectureDetail'
//         }
//     }
//     ], function (err, res) {
//         if (err) throw err;
//         console.log(res);
//     });

module.exports = courseDB;
