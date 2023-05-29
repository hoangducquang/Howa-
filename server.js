var express = require("express");
const app = express();
const route = express.Router();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const jwt = require('jsonwebtoken');
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set('views', 'views')
app.use("/scripts", express.static(__dirname + "/node_modules/web3.js-browser/build/"));
app.use('/css', express.static(__dirname + "public/styles/"));
app.use('/js', express.static(__dirname + "public/scripts/"));
app.use('/img', express.static(__dirname + "public/images/"));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});
var Cookies = require('js-cookie');

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
const ordersDB = require("./models/orders")

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

//get create course form
app.get('/courses/create.html', async function (req, res) {
	res.render('courses/create')
})

// get my course

app.get('/account/mycourse/:id', async(req, res) => {
	orders = await ordersDB.find({
		users_id: req.params.id
	})
	// console.log(orders)
	res.render('../views/account/mycourse', { orders: orders, id: req.params.id});

});

app.get('/api/account/mycourse/:id', async (req, res) => {
    try {
        const orders = await ordersDB.find({ users_id: req.params.id });
		var getOrders = []
		for (let elm of orders) {
			let course = await courseDB.findOne({
				_id: elm.courses_id,
			})
			
			getOrders.push(course)
		};
		
		console.log(getOrders)
        res.json({ getOrders, id: req.params.id });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});



app.get('/upload-image', (req, res) => {
	//if (err) throw err;
	res.render('scripts/upload-image.',
	)
})

//post login form
app.post('/login', async (request, response) => {
	const user = await userDB.findOne({ email: request.body.email });

	if (!user) return response.status(422).send({ message: 'Email or Password is not correct' });
	const CryptoJS = require('crypto-js');
	const hashPassword = CryptoJS.SHA256(request.body.password);

	const checkPassword = hashPassword.toString().localeCompare(user.password);

	if (!checkPassword) return response.status(422).send({ message: 'Email or Password is not correct' });

	const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });

	return response.status(200).send({
		token,
		user: {
			_id: user._id,
			name: user.name,
			email: user.email
		},
		message: 'Login successfully'
	});
})

const verifyToken = require('./middlewares/verifyToken');

app.get('/', verifyToken, (request, response) => {
	User.find({}).exec(function (err, users) {
		response.send(users);
	});
});


require("./controllers/game")(app);

module.exports = route;




