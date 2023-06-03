var express = require("express");
const app = express();
const route = express.Router();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const jwt = require('jsonwebtoken');
app.use(express.json());
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
//const validations = require('/js/serviceAccountKey.json');
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

// Profile account
app.get('/account/profile.html', (req, res) => {
	res.render('account/profile',
	)
})

app.get('/api/account/profile/:id', async (req, res) => {
	try {
		const userCurrent = await userDB.findOne({
			_id: req.params.id,
		})
		
		res.json({userCurrent})
	} catch (error) {
		console.error("Lỗi: ", error)
		res.status(500).json({err: "Lỗi server"})
	}

})


app.get('/account/edit-profile.html', (req, res) => {
	res.render('account/edit-profile',
	)
})

app.put('/account/edit-profile/:id', async (req, res) => {
	if (!req.body.name || !req.body.dob || !req.body.email || !req.body.phone || !req.body.address) {
	  res.status(500).json({ result: 0, err: 'Vui lòng cung cấp đầy đủ thông tin.' + req.body.name });
	} else {
	  try {
		const changeProfile = await userDB.findByIdAndUpdate(
		  req.params.id,
		  {
			name: req.body.name,
			dob: req.body.dob,
			email: req.body.email,
			phone: req.body.phone,
			address: req.body.address,
			update_at: Date.now(),
		  },
		  {
			new: true,
			runValidators: true,
		  }
		);
  
		if (!changeProfile) {
		  return res.status(500).json({ result: 0, err: 'Có lỗi xảy ra khi chỉnh sửa hồ sơ.' });
		}
		res.json({ result: 1, err: 'Chỉnh sửa hồ sơ thành công.' });
	  } catch (err) {
		console.error(err);
		return res.status(500).json({ result: 0, err: 'Có lỗi xảy ra khi chỉnh sửa hồ sơ.' });
	  }
	}
});



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

app.get('/partials/header', (req, res) => {
	res.render('partials/header',
	)
})

app.get('/header.html', (req, res) => {
	res.render('header',
	)
})

app.get('/auth', (req, res) => {
	res.render('auth/login',
	)
})

// Login
app.get('/auth/login.html', (req, res) => {
	res.render('auth/login',
	)
})

app.post('/auth/login', async(req, res) => {
	if(!req.body.email || !req.body.password) {
		res.json({result: 0, err: "Not enough info"})
	}else{
		var userCurrent = await userDB.findOne({
			email: req.body.email,
		})
		if(userCurrent == null) {
			res.json({result: 0, err: 'Email is not exist'})
		}else {
			const hashPassword = CryptoJS.SHA256(req.body.password).toString();
			if(userCurrent.password === hashPassword) {
				res.json({result: 1, err: " Login successful!", valReturn: userCurrent._id})
			}else {
				console.log(hashPassword);
				res.json({result: 0, err: "Password is not right"})
			}
		}
		
	}
})

// Sign up
app.get('/auth/signup.html', (req, res) => {
	res.render('auth/signup',
	)
})

app.post('/auth/signup', (req, res) => {
	if(!req.body.name || !req.body.email || !req.body.password || !req.body.dob || !req.body.phone) {
		res.json({result:0, err: "Not enough information!" + req.body.name});
	}else {
		const hashPassword = CryptoJS.SHA256(req.body.password);
		console.log("on")
		var newUser = new userDB({
			name: req.body.name,
			dob:req.body.dob,
			email: req.body.email,
			phone: req.body.phone,
			address: null, 
			update_at: Date.now(),
			password: hashPassword,
		})
	}
	newUser.save((err) => {
		//Cần hiển thị từng error riêng để người dùng biết được field nào đã tồn tại.
		if(err){
			console.log(err)
			res.json({result: 0, err: "MongooseDB save error! " + err}); 
		}else{
			res.render('../views/auth/login.ejs', {User: newUser})
		}
	})
});

// Course Home
app.get('/courses', (req, res) => {
	res.render('courses/index',
	)
})

app.get('/courses/index.html', (req, res) => {
	res.render('courses/index',
	)
})

app.get('/api/courses/index', async (req, res) => {
	try {
		const coursesAll = await courseDB.find({});
		// console.log(coursesAll)
		res.json( { coursesAll } );
	} catch (error) {
		console.error('Lỗi:', error);
		res.status(500).json({ error: 'Lỗi server' });
	}
});


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
const CryptoJS = require('crypto-js');

//get user profile
// app.get('/account/profile/:id', async function (req, res) {
// 	user = await userDB.findOne({
// 		_id: req.params.id
// 	})
// 	console.log(user);
// 	res.render("../views/account/profile", { user: user });
// });

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

// Check buy course
app.get('/check-buycourse', (req, res) => {
	const { courses_id, users_id } = req.query;
  
	ordersDB.findOne({ courses_id, users_id }, (err, result) => {
	  if (err) {
		console.error(err);
		return res.status(500).json({ result: 0, error: 'Đã xảy ra lỗi' });
	  }
  
	  if (result) {
		return res.json({ result: 1, error: 'Success' });
	  } else {
		return res.json({ result: -1, error: 'Not exist' });
	  }
	});
  });

//get create course form
app.get('/courses/create.html', async function (req, res) {
	res.render('courses/create')
})

// get my course
app.get('/account/mycourse/:id', async (req, res) => {
	orders = await ordersDB.find({
		users_id: req.params.id
	})
	// console.log(orders)
	res.render('../views/account/mycourse', { orders: orders, id: req.params.id });
	
});

app.get('/account/mycourse.html', (req, res) => {
	res.render('../views/account/mycourse');
	
})


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

const multer = require('multer');
const admin = require('firebase-admin');

// Khởi tạo Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: 'blockchain-project-5d4d4.appspot.com'
});

// Thiết lập Multer để xử lý upload file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Hiển thị trang upload ảnh
app.get('/upload-image', (req, res) => {
	res.render('courses/upload-img',)
});

// Xử lý upload ảnh
app.post('/upload', upload.single('image'), (req, res) => {
	const file = req.file;

	if (!file) {
		return res.status(400).send('No file uploaded.');
	}

	// Lưu ảnh vào Firebase Storage
	const bucket = admin.storage().bucket();
	const blob = bucket.file(Date.now()+'_'+file.originalname);
	const blobStream = blob.createWriteStream();

	blobStream.on('error', (err) => {
		console.error(err);
		res.status(500).send('Upload failed.');
	});

	blobStream.on('finish', () => {
		// Lấy đường dẫn public của ảnh đã upload
		const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${blob.name}?alt=media&token=`;
		res.status(200).send(`Image uploaded successfully. Public URL: ${publicUrl}`);
	});

	blobStream.end(file.buffer);
});

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

app.get('/service', (req, res) => {
	//if (err) throw err;
	console.log("Testing service");
	res.render(validations,
	)
})

require("./controllers/game")(app);

module.exports = route;




