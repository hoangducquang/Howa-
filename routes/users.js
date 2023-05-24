const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var user = require('../models/user')
const verifyToken = require('../middlewares/verifyToken');

mongoose.connect('mongodb+srv://projectblockchain:HDQMTnp05102001@cluster0.qyrt65b.mongodb.net/projectblockchain?retryWrites=true&w=majority')

mongoose.connection.on('open',()=>{
  console.log("Connection OK");
});

mongoose.connection.on('error',(err)=>{
  console.log("Connection Fail",err);
});

router.get('/account/profile/:id',function(req, res){
    console.log('getting one book');
    user.findOne({
        _id: req.params.id
    }).exec(function(err, user){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(user);
            res.json(user);
        }
    });
});

router.get('/courses/create.html', (req, res) => {
	db.collection('categories').find().toArray((err, categories) => {
		if (err) {
			console.error(err);
			return;
		}
		res.render('../views/courses/create',{categories: categories});
	});
});

router.get('/', verifyToken, (request, response) => {
    User.find({}).exec(function (err, users) {
        response.send(users);
    });
});

module.exports = router;