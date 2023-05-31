var member = require("../models/member");
const courseDB = require("../models/course");
const ordersDB = require("../models/orders")
const userDB = require('../models/user')

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("/login", (req, res) => {
        res.render("auth/login")
    });
    
    app.get("/auth/signup", (req, res) => {
        res.render("auth/signup")
    });


    // app.post("/register", (req, res) => {
    //     if(!req.body.name || !req.body.numberDay || !req.body.endTimeRegister || !req.body.endTimeCourse || !req.body.price){
    //         res.json({result:0, err: "Not enough information"});
    //     }else{
    //         var newCourse = new member({
    //             name: req.body.name,
    //             numberDay: req.body.numberDay,
    //             endTimeRegister: req.body.endTimeRegister,
    //             endTimeCourse: req.body.endTimeCourse,
    //             price: req.body.price,
    //             dayTime: Date.now()
    //         })
    //     }
    //     newCourse.save((err) => {
    //         if(err){
    //             res.json({result: 0, err: "MongooseDB save error! " + err}); 
    //         }else{
    //             res.json({result: 1, err: newCourse});
    //         }
    //     })
    // })

    app.post("/courses", (req, res) => {
        if(!req.body.name || !req.body.lectures_id || !req.body.end_regist || !req.body.end_date  || !req.body.price){
            res.json({result:0, err: "Not enough information"});
        }else{
            var newCourse = new courseDB({
                categories_id: req.body.categories_id,
                description: req.body.description,
                lectures_id: req.body.lectures_id,
                name: req.body.name,
                price: req.body.price,
                old_price: req.body.old_price,
                num_days: req.body.num_days,
                end_date: req.body.end_date,
                start_date: req.body.start_date,
                end_regist: req.body.end_regist,
                create_at: Date.now(),
                delete_at: Date.now(),
                update_at: Date.now(),
                image: "https://rightclickit.com.au/wp-content/uploads/2018/09/Image-Coming-Soon-ECC.png",
                users_id: "6437b0c684ab3117410be702",
            })
        }
        newCourse.save((err) => {
            if(err){
                console.log('err: ', err)
                res.json({result: 0, err: "MongooseDB save error! " + err}); 
            }else{
                res.json({result: 1, err: newCourse});
            }
        })
    })

    app.post("/account", (req, res) => {
        if(!req.body.courses_id || !req.body.create_at || !req.body.users_id ){
            res.json({result:0, err: "Not enough information"});
        }else{
            console.log("222")
            var newOrders = new ordersDB({
                courses_id: req.body.courses_id,
                create_at: req.body.create_at,
                users_id: req.body.users_id,
            })
        }
        newOrders.save((err) => {
            if(err){
                console.log(err)
                res.json({result: 0, err: "MongooseDB save error! " + err}); 
            }else{
                console.log("444")
                res.json({result: 1, err: newOrders});
            }
        })
    })
    
    app.post('/auth/signup', (req, res) => {
        if(!req.body.name || !req.body.email || !req.body.password) {
            res.json({result:0, err: "Not enough information"});
        }else {
            console.log("on")
            var newUser = new userDB({
                name: req.body.name,
                dob:req.body.dob,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address, 
                update_at: req.body.update_at,
            })
        }
        newUser.save((err) => {
            if(err){
                console.log(err)
                res.json({result: 0, err: "MongooseDB save error! " + err}); 
            }else{
                console.log("444")
                res.json({result: 1, err: newUser});
            }
        })
    });
}