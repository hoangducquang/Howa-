var express = require("express");
const app = express();
const route = express.Router();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const jwt = require("jsonwebtoken");
const axios = require('axios');
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(
  "/scripts",
  express.static(__dirname + "/node_modules/web3.js-browser/build/")
);
app.use("/css", express.static(__dirname + "public/styles/"));
app.use("/js", express.static(__dirname + "public/scripts/"));
app.use("/img", express.static(__dirname + "public/images/"));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
var Cookies = require("js-cookie");
//const validations = require('/js/serviceAccountKey.json');
const controller = require("./controllers/userController");

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.get("/index.html", (req, res) => {
  res.render("index");
});

app.get("", (req, res) => {
  res.render("index");
});

// Profile account

app.get('/account/profile.html', (req, res) => {
	res.render('account/profile',
	)
})

app.get('/terms', (req, res) => {
	res.render('terms',
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
	if (!req.body.name) {
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

app.get("/api/account/profile/:id", async (req, res) => {
  try {
    const userCurrent = await userDB.findOne({
      _id: req.params.id,
    });

    res.json({ userCurrent });
  } catch (error) {
    console.error("Lỗi: ", error);
    res.status(500).json({ err: "Lỗi server" });
  }
});

app.get("/api/account/edit-profile/:id", async (req, res) => {
	try {
		const userCurrent = await userDB.findOne({
		  _id: req.params.id,
		});
	
		res.json({ userCurrent });
	  } catch (error) {
		console.error("Lỗi: ", error);
		res.status(500).json({ err: "Lỗi server" });
	  }
	});
	
app.post('/account/edit-password/:id', async(req, res) => {
	if(!req.body.currentpassword || !req.body.newpassword || !req.body.renewpassword){
		res.json({result: 0, err: 'Not enough info'})
	}else if(req.body.newpassword !== req.body.renewpassword){
		res.json({result: 0, err: "New Password not equal renew Password"})
	}
	else{
		var userCurrent = await userDB.findOne({
			_id: req.params.id,
		})
		if(userCurrent == null){
			res.json({result: 0, err: "Id not exist"})
		}else{
			const hashPassword = CryptoJS.SHA256(req.body.currentpassword).toString();
			if(userCurrent.password == hashPassword){
				try{
					const changeProfile = await userDB.findByIdAndUpdate(
						req.params.id,
						{
						  password: CryptoJS.SHA256(req.body.newpassword).toString(),
						},
						{
						  new: true,
						  runValidators: true,
						}
					);
					if(!changeProfile){
						return res.status(500).json({ result: 0, err: 'Err when edit' });
					}  
					res.json({result: 1, err: 'Change success'})
				}catch(err){
					console.error(err);
					return res.status(500).json({ result: 0, err: 'Err edit' });
				}
			
			}
		}
	}
})

app.get('/account/wallet.html', (req, res) => {
	res.render('account/wallet',
	)
})

app.get("/account/edit-profile.html", (req, res) => {
  res.render("account/edit-profile");
});

app.put("/account/edit-profile/:id", async (req, res) => {
  if (!req.body.name && req.body.phone) {
    res.status(500).json({
        result: 0,
        err: "Please enter name"
      });
  }else if (!req.body.phone && req.body.name){
	res.status(500).json({
        result: 0,
        err: "Please enter phone"
      });
	}else if(!req.body.name && !req.body.phone){
	  res.status(500).json({
		  result: 0,
		  err: "Please enter name and phone"
		});
	}else {
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
        return res
          .status(500)
          .json({ result: 0, err: "Có lỗi xảy ra khi chỉnh sửa hồ sơ." });
      }
      res.json({ result: 1, err: "Chỉnh sửa hồ sơ thành công." });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ result: 0, err: "Có lỗi xảy ra khi chỉnh sửa hồ sơ." });
    }
  }
});

app.get("/account/edit-password.html", (req, res) => {
  res.render("account/edit-password");
});

app.get("/account/wallet.html", (req, res) => {
  res.render("account/wallet");
});

app.get("/auth/forgot.html", (req, res) => {
  res.render("auth/forgot");
});

app.get("/partials/header", (req, res) => {
  res.render("partials/header");
});

app.get("/header.html", (req, res) => {
  res.render("header");
});

app.get("/partials/footer", (req, res) => {
  res.render("partials/footer");
});

app.get("/footer.html", (req, res) => {
  res.render("footer");
});

app.get("/auth", (req, res) => {
  res.render("auth/login");
});

// Login
app.get("/auth/login.html", (req, res) => {
  res.render("auth/login");
});


app.post('/auth/login', async(req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
	if(!req.body.email || !req.body.password) {
		res.json({result: 0, err: "Not enough info" + req.body.email + ' ' + req.body.password})
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
app.get("/auth/signup.html", (req, res) => {
  res.render("auth/signup");
});



// Course Home
app.get("/courses", (req, res) => {
  res.render("courses/index");
});

app.get("/courses/index.html", (req, res) => {
  res.render("courses/index");
});

app.get("/api/courses/index", async (req, res) => {
  try {
    const coursesAll = await courseDB.find({});
    // console.log(coursesAll)
    res.json({ coursesAll });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

app.get("/layout", (req, res) => {
  res.render("layout");
});

app.post("/auth/forgot.html", function (request, response, next) {
  response.send(request.body);
});

app.post("/account/edit-password.html", function (request, response, next) {
  response.send(request.body);
});

app.get("/password", (req, res) => {
  res.render("password");
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
const categoryDB = require("./models/category");
const ordersDB = require("./models/orders");
const CryptoJS = require("crypto-js");
const userOTPVerification = require("./models/userOTPVerification");

//get user profile - edit
app.get("/account/edit-profile/:id", async function (req, res) {
  user = await userDB.findOne({
    _id: req.params.id,
  });
  console.log(user);
  res.render("../views/account/edit-profile", { user: user });
});

//get course detail
app.get("/courses/detail/:id", async function (req, res) {
  course = await courseDB.findOne({
    _id: req.params.id,
  });
  console.log(course);
  res.render("../views/courses/coursedetail", { course: course });
});

// Check canceled
app.get('/check-canceled', (req, res) => {
  const { courses_id, users_id } = req.query;

  ordersDB.findOne({ courses_id, users_id }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ result: 0, error: "Đã xảy ra lỗi" });
    }

    if (result) {
      if(result.canceled == false){
        result.canceled = true
        result.save()
        .then(updatedOrder => {
          // Thực hiện các hành động khác sau khi lưu thành công
          console.log('Đã thay đổi trạng thái của đơn hàng');
          console.log(updatedOrder);
        })
        .catch(error => {
          // Xử lý lỗi nếu có
          console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
        });
      }
      return res.json({ result: 1, error: "Success" });
    } else {
      return res.json({ result: -1, error: "Not exist" });
    }
  });
})

// Check buy course
app.get("/check-buycourse", (req, res) => {
  const { courses_id, users_id } = req.query;

  ordersDB.findOne({ courses_id, users_id, canceled: false }, async(err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ result: 0, error: "Đã xảy ra lỗi" });
    }

    if (result) {
      const course = await courseDB.findOne({
        _id: courses_id,
      });
      const currentTime = Math.floor(Date.now() / 1000);
      const end_registTime = Math.floor(new Date(course.end_regist) / 1000)
      const end_dateTime = Math.floor(new Date(course.end_regist) / 1000)
      console.log(currentTime);
      // Trường hợp người dùng có thể huỷ khoá học(thời gian hiện tại nhỏ hơn thời gian đăng kí)
      if(currentTime < end_registTime) {
        return res.json({ result: 1, error: "Success cancel" });
      // Trường hợp người dùng huỷ khoá học và rút tiền(thời gian hiện tại lớn hơn thời gian đăng kí và nhỏ hơn thời gian kết thúc)
      }else if(currentTime > end_registTime && currentTime < end_dateTime){
        return res.json({result: 2, error: "Success withdraw and cancel"})
      }else {
        return res.json({result: 3, error: "Success withdraw"})
      }
      
    } else {
      return res.json({ result: -1, error: "Not exist" });
    }
  });
});

//get create course form
app.get("/courses/create.html", async function (req, res) {
  res.render("courses/create");
});



app.get("/courses/meeting", async function (req, res) {
  res.render("courses/meeting");
});

// Heading

// Đường dẫn để tạo cuộc họp Zoom

// get my course
app.get("/account/mycourse/:id", async (req, res) => {
  orders = await ordersDB.find({
    users_id: req.params.id,
  });
  // console.log(orders)
  res.render("../views/account/mycourse", {
    orders: orders,
    id: req.params.id,
  });
});

app.get("/account/mycourse.html", (req, res) => {
  res.render("../views/account/mycourse");
});

app.get("/api/account/mycourse/:id", async (req, res) => {
  try {
    const orders = await ordersDB.find({ users_id: req.params.id, canceled: false });
    var getOrders = [];
    for (let elm of orders) {
      let course = await courseDB.findOne({
        _id: elm.courses_id,
      });

      getOrders.push(course);
    }

    console.log(getOrders);
    res.json({ getOrders, id: req.params.id });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

const multer = require("multer");
const admin = require("firebase-admin");

// Khởi tạo Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "blockchain-project-5d4d4.appspot.com",
});

// Thiết lập Multer để xử lý upload file
const storage = multer.memoryStorage();

// Hiển thị trang upload ảnh
app.get("/upload-image", (req, res) => {
  res.render("courses/upload-img");
});

const upload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024, // 3MB
  },
});

app.post(
  "/upload",
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        // Xử lý lỗi khi dung lượng vượt quá giới hạn
        return res.status(400).send("File size exceeds the limit < 2MB");
      } else if (err) {
        // Xử lý lỗi multer khác
        console.log("0: "+err);
        console.log("0_1: "+req.file);
        return res.status(500).send("Upload failed.");
      }

      next();
    });
  },
  (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    // Lấy thời gian hiện tại dưới dạng Unix
    const unixTime = Date.now();

    // Tạo tên file mới dựa trên thời gian Unix và định dạng của file gốc
    const fileName = `${unixTime}.${file.originalname.split(".").pop()}`;

    // Lưu ảnh vào Firebase Storage
    const bucket = admin.storage().bucket();
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      console.error("1: "+err);
      res.status(500).send("Upload failed.");
    });

    blobStream.on("finish", () => {
      // Get the public URL of the uploaded image
      blob
        .makePublic()
        .then(() => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          return res.status(200).json({ publicUrl: publicUrl });
        })
        .catch((err) => {
          console.error("2: "+err);
          res.status(500).send("Error retrieving public URL.");
        });
    });
    blobStream.end(file.buffer);
  }
);

//post login form
app.post("/login", async (request, response) => {
  const user = await userDB.findOne({ email: request.body.email });

  if (!user)
    return response
      .status(422)
      .send({ message: "Email or Password is not correct" });
  const CryptoJS = require("crypto-js");
  const hashPassword = CryptoJS.SHA256(request.body.password);

  const checkPassword = hashPassword.toString().localeCompare(user.password);

  if (!checkPassword)
    return response
      .status(422)
      .send({ message: "Email or Password is not correct" });

  const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  return response.status(200).send({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    message: "Login successfully",
  });
});

const verifyToken = require("./middlewares/verifyToken");

app.get("/", verifyToken, (request, response) => {
  User.find({}).exec(function (err, users) {
    response.send(users);
  });
});

app.get("/service", (req, res) => {
  //if (err) throw err;
  console.log("Testing service");
  res.render(validations);
});

require("./controllers/game")(app);

module.exports = route;
