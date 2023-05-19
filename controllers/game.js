var member = require("../models/member");
const courseDB = require("../models/course");

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("/login", (req, res) => {
        res.render("auth/login")
    });
    
    app.get("/signup", (req, res) => {
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
                num_days: req.body.num_days,
                end_date: req.body.end_date,
                start_date: req.body.start_date,
                end_regist: req.body.end_regist,
                create_at: Date.now(),
                delete_at: Date.now(),
                update_at: Date.now(),
                image: "Link",
                users_id: "6437b0c684ab3117410be702",
            })
        }
        newCourse.save((err) => {
            if(err){
                res.json({result: 0, err: "MongooseDB save error! " + err}); 
            }else{
                res.json({result: 1, err: newCourse});
            }
        })
    })
}