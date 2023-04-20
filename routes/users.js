const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var user = require('../models/user')

mongoose.connect('mongodb+srv://projectblockchain:HDQMTnp05102001@cluster0.qyrt65b.mongodb.net/?retryWrites=true&w=majority')

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
/*
    You can try with Postman
    https://www.getpostman.com/
*/
module.exports = router;