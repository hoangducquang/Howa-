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

// app.get('/account/profile.html',(req, res) => {
// 	res.render('account/profile',
// 	)
// })

app.get('/account/mycourse.html', (req, res) => {
	res.render('account/mycourse',
	)
})

app.get('/account/edit-profile.html', (req, res) => {
	res.render('account/edit-profile',
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

app.get('/courses/basic-python.html', (req, res) => {
	res.render('courses/basic-python',
	)
})

app.get('/courses/create.html', (req, res) => {
	res.render('courses/create',
	)
})

app.get('/courses/index-copy.html', (req, res) => {
	res.render('courses/index copy',
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

app.post('/auth/forgot.html', function (request, response, next) {
	response.send(request.body);
});

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
app.get('/courses/:id', async function (req, res) {
	course = await courseDB.findOne({
		_id: req.params.id
	})
	console.log(course);
	res.render("../views/courses/basic-python", { course: course });
});

require("./controllers/game")(app);

module.exports = route;




