var express = require("express");
var app = express();
const route = express.Router();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set('views', 'views')
app.use("/scripts", express.static(__dirname + "/node_modules/web3.js-browser/build/"));
app.use('/css', express.static(__dirname + "public/styles/"));
app.use('/js', express.static(__dirname + "public/scripts/"));
app.use('/img', express.static(__dirname + "public/images/"));
app.use(function(req, res,next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','GET, POST, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials','true');
	next();
});
const controller = require('./controllers/userController');

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.get('/index.html', (req, res) => {
	res.render('index',
	)
})

app.get('', (req, res) => {
	res.render('index',
	)
})

app.get('/account', (req, res) => {
	res.render('account/profile',
	)
})

app.get('/account/mycourse.html', (req, res) => {
	res.render('account/mycourse',
	)
})

app.get('/account/edit-profile.html', (req, res) => {
	res.render('account/edit-profile',
	)
})

app.get('/account/edit-password.html', (req, res) => {
	res.render('account/edit-password',
	)
})

app.get('/account/wallet.html', (req, res) => {
	res.render('account/wallet',
	)
})

app.get('/auth/forgot.html', (req, res) => {
	res.render('auth/forgot',
	)
})

app.get('/auth', (req, res) => {
	res.render('auth/login',
	)
})

app.get('/auth/login.html', (req, res) => {
	res.render('auth/login',
	)
})

app.get('/auth/signup.html', (req, res) => {
	res.render('auth/signup',
	)
})

app.get('/courses', (req, res) => {
	res.render('courses/index',
	)
})

app.get('/courses/index.html', (req, res) => {
	res.render('courses/index',
	)
})

app.get('/layout', (req, res) => {
	res.render('layout',
	)
})

app.post('/auth/forgot.html', function (request, response, next) {
	response.send(request.body);
});

app.post('/account/edit-password.html', function (request, response, next) {
	response.send(request.body);
});

app.get('/password', (req, res) => {
	res.render('password',
	)
})

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Mongoose
// projectblockchain 0f8jx9y02fXfhx5E
const mongoose = require("mongoose");
const userDB = require("./models/user");
const courseDB = require("./models/course");
const lectureDB = require("./models/lecture");
const categoryDB = require("./models/category");
mongoose.connect("mongodb+srv://projectblockchain:HDQMTnp05102001@cluster0.qyrt65b.mongodb.net/projectblockchain?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
	if (err) {
		console.log("Mongoose connect error!" + err);
	}
	else {
		console.log("Mongoose connected successfully!");
	}
});

//get user profile
app.get('/account/profile/:id', async function (req, res) {
	user = await userDB.findOne({
		_id: req.params.id
	})
	console.log(user);
	res.render("../views/account/profile", { user: user });
});

//get user profile - edit
app.get('/account/edit-profile/:id', async function (req, res) {
	user = await userDB.findOne({
		_id: req.params.id
	})
	console.log(user);
	res.render("../views/account/edit-profile", { user: user });
});

//get course detail
app.get('/courses/detail/:id', async function (req, res) {
	course = await courseDB.findOne({
		_id: req.params.id
	})
	console.log(course);
	res.render("../views/courses/coursedetail", { course: course });
});

//
app.get('/courses/create.html', (req, res) => {
	//if (err) throw err;
	res.render('../views/courses/create',
	)
})

app.get('/upload-image', (req, res) => {
	//if (err) throw err;
	res.render('scripts/upload-image.',
	)
})

require("./controllers/game")(app);

module.exports = route;




