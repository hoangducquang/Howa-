var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set('views', 'views')
app.use("/scripts", express.static(__dirname+"/node_modules/web3.js-browser/build/"));

app.use('/css', express.static(__dirname+"public/styles/"));
app.use('/js', express.static(__dirname+"public/scripts/"));
app.use('/img', express.static(__dirname+"public/images/"));

app.get('/index.html',(req, res) => {
	res.render('index',
	)
})

app.get('/account',(req, res) => {
	res.render('account/profile',
	)
})

app.get('/account/profile.html',(req, res) => {
	res.render('account/profile',
	)
})

app.get('/account/wallet.html',(req, res) => {
	res.render('account/wallet',
	)
})

app.get('/auth/forgot.html',(req, res) => {
	res.render('auth/forgot',
	)
})

app.get('/auth',(req, res) => {
	res.render('auth/login',
	)
})

app.get('/auth/login.html',(req, res) => {
	res.render('auth/login',
	)
})

app.get('/auth/signup.html',(req, res) => {
	res.render('auth/signup',
	)
})

app.get('/courses/basic-python.html',(req, res) => {
	res.render('courses/basic-python',
	)
})

app.get('/courses/create.html',(req, res) => {
	res.render('courses/create',
	)
})

app.get('/courses',(req, res) => {
	res.render('courses/index',
	)
})

app.get('/courses/index.html',(req, res) => {
	res.render('courses/index',
	)
})

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

// Mongoose
// projectblockchain 0f8jx9y02fXfhx5E
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://projectblockchain:HDQMTnp05102001@cluster0.qyrt65b.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, (err) =>{
	if(err){
		console.log("Mongoose connect error!" + err);
	}
	else{
		console.log("Mongoose connected successfully");
	}
});


require("./controllers/game")(app);





