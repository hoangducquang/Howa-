var member = require("../models/member");

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.render("index");
    });

    app.post("/register", (req, res) => {
        if(!req.body.name || !req.body.numberDay || !req.body.endTimeRegister || !req.body.endTimeCourse || !req.body.price){
            res.json({result:0, err: "Not enough information"});
        }else{
            var newCourse = new member({
                name: req.body.name,
                numberDay: req.body.numberDay,
                endTimeRegister: req.body.endTimeRegister,
                endTimeCourse: req.body.endTimeCourse,
                price: req.body.price,
                dayTime: Date.now()
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