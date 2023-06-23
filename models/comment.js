const mongoose = require('mongoose');
const lectureDB = require("../models/lecture");
const { update } = require('../controllers/userController');
const { Int32, Timestamp } = require('mongodb');
var ObjectId = mongoose.Schema.ObjectId;
var Schema = mongoose.Schema;

var commentList = new mongoose.Schema({
    id: {
        type: ObjectId,
        // required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    courses_id: {
        type: String, 
        required: true
    }
    
});

const commentDB = mongoose.model('comments', commentList);

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

module.exports = commentDB;
