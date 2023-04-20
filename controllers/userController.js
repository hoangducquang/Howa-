const userDB = require('../models/user');
const mongoose = require("mongoose");
const UserController = {}
//create and save new user
exports.create = (req,res)=>{

}

//return a single user profile
exports.find = (req,res)=>{
    if(req.query.id){
        const _id = req.query.id;

        userDB.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })
    }else{
        userDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
}

//update a user profile by user.id
exports.update = (req,res)=>{

}

//delete a user profile by user.id
exports.delete = (req,res)=>{

}

UserController.show = (req,res)=>{
    userDB.findOne({_id: req.params.id}).exec((err, user) => {
        if(err){
            console.log("Error", err);
        }else{
            res.render("../views/account/profile", {user:user});
        }
    });
};

module.exports = UserController;
