var member = require("../models/member");

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.render("layout");
    });

    app.post("/register", (req, res) => {
        if(!req.body.name || !req.body.email || !req.body.phoneNumber){
            res.json({result:0, err: "Not enough information"});
        }else{
            var newMember = new member({
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber, 
                wallet: "", 
                dayTime: Date.now(),
                pay: false 
            })
        }
        newMember.save((err) => {
            if(err){
                res.json({result: 0, err: "MongooseDB save error! " + err}); 
            }else{
                res.json({result: 1, err: newMember});
            }
        })
    })

}