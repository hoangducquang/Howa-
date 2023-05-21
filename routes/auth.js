const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const User = require('../models/user');
const { registerValidator } = require('../validations/auth');
const { update } = require('../controllers/userController');

router.post('/register', async (request, response) => {
    const { error } = registerValidator(request.body);

    if (error) return response.status(422).send(error.details[0].message);

    const checkEmailExist = await User.findOne({ email: request.body.email });

    if (checkEmailExist) return response.status(422).send('Email is exist');

    const hashPassword = CryptoJS.SHA256(request.body.password);

    const user = new User({
        email: request.body.email,
        name: request.body.name,
        dob: request.body.dob,
        password: hashPassword,
        address: null,
        create_at: Date.now,
        update_at: Date.now,
        delete_at: null
    });

    try {
        const newUser = await user.save();
        await response.send(newUser);
    } catch (err) {
        response.status(400).send(err);
    }
});

router.post('/login', async (request, response) => {
    const user = await User.findOne({email: request.body.email});

    if (!user) return response.status(422).send({message: 'Email or Password is not correct'});

    const hashPassword = CryptoJS.SHA256(request.body.password);

    const checkPassword = hashPassword.localeCompare(user.password);

    if (!checkPassword) return response.status(422).send({message: 'Email or Password is not correct'});

    const token = await jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });

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

module.exports = router;