var member = require("../models/member");
const courseDB = require("../models/course");
const ordersDB = require("../models/orders")
const userDB = require('../models/user')
const CryptoJS = require('crypto-js');

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

    app.post("/auth/signup", (req, res) => {
        if (
          !req.body.name ||
          !req.body.email ||
          !req.body.password ||
          !req.body.dob ||
          !req.body.phone
        ) {
          res.json({ result: 0, err: "Not enough information!" + req.body.name });
        }
         else {
          const hashPassword = CryptoJS.SHA256(req.body.password);
          console.log("on");
          var newUser = new userDB({
            name: req.body.name,
            dob: req.body.dob,
            email: req.body.email,
            phone: req.body.phone,
            address: null,
            update_at: Date.now(),
            password: hashPassword,
            image: "https://firebasestorage.googleapis.com/v0/b/blockchain-project-5d4d4.appspot.com/o/no-profile-picture-icon.png?alt=media&token=5edc75f1-b5a3-40e2-8a1b-71be9127fd67",
          });
        }
        newUser.save((err) => {
          //Cần hiển thị từng error riêng để người dùng biết được field nào đã tồn tại.
          if (err) {
            console.log(err);
            res.json({ result: 0, err: "MongooseDB save error! " + err });
          } else {
            res.render("../views/auth/login.ejs", { User: newUser });
          }
        });
      });


    app.post("/courses/create", (req, res) => {
        if(!req.body.name || !req.body.lectures_id || !req.body.end_regist || !req.body.end_date  || !req.body.price 
            || !req.body.image || !req.body.start_date || !req.body.categories_id || !req.body.start_date 
            || !req.body.description || !req.body.num_days){
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
                image: req.body.image,
                users_id: req.body.users_id,
                withdraw: false,
                meeting: '',
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

    app.post("/account/order", (req, res) => {
        if (!req.body.courses_id || !req.body.create_at || !req.body.users_id) {
            return res.json({ result: 0, err: "Not enough information" });
        }
    
        ordersDB.findOne({ courses_id: req.body.courses_id, users_id: req.body.users_id }, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ result: 0, error: "Đã xảy ra lỗi" });
            }
    
            if (result) {
                if (result.canceled == true) {
                    result.canceled = false;
                    result.save()
                        .then(updatedOrder => {
                            console.log('Đã đăng kí lại đơn hàng');
                            console.log(updatedOrder);
                            return res.json({ result: 1, error: "Success" });
                        })
                        .catch(error => {
                            console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
                            return res.status(500).json({ result: 0, error: "Lỗi khi cập nhật trạng thái đơn hàng" });
                        });
                } else {
                    return res.json({ result: 1, error: "Success" });
                }
            } else {
                var newOrders = new ordersDB({
                    courses_id: req.body.courses_id,
                    create_at: req.body.create_at,
                    users_id: req.body.users_id,
                    canceled: false
                });
    
                newOrders.save((err) => {
                    if (err) {
                        console.log(err);
                        return res.json({ result: 0, err: "MongooseDB save error! " + err });
                    } else {
                        console.log("444");
                        return res.json({ result: 1, err: newOrders });
                    }
                });
            }
        });
    });
}