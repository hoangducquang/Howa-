var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

// Mongoose
// projectblockchain 0f8jx9y02fXfhx5E
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://projectblockchain:0f8jx9y02fXfhx5E@cluster0.qyrt65b.mongodb.net/projectblockchain?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, (err) =>{
	if(err){
		console.log("Mongoose connect error!" + err);
	}
	else{
		console.log("Mongoose connected successfully");
	}
});


require("./controllers/game")(app);





