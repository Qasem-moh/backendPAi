const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User,
    validateLoginUser,
    validateRegisterUser,
    validateUpdateUser } = require("../models/User")
/**
 * @desc Register a new user
 * @method POST /api/auth/register
 * @param {string} username - The username of the user
 * @param {string} password - The password of the user
 * @returns {Object} The newly created user
 * @access Public
 * @body {string} username - The username of the user
 * @body {string} password - The password of the user
 */

router.post('/register', asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });
    const result = await user.save();
    const token = null;
    const { password, ...other } = result._doc
    res.status(201).json({ message: 'User registered successfully', ...other, token });
}))



/**
 * @desc Login user
 * @method POST /api/auth/login
 * @param {string} username - The username of the user
 * @param {string} password - The password of the user
 * @returns {Object} The newly created user
 * @access Public
 * @body {string} username - The username of the user
 * @body {string} password - The password of the user
 */

router.post('/login', asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

   
    const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT_SECRET);;
    const { password, ...other } = user._doc
    res.status(200).json({ message: 'User logged in successfully', ...other, token });
}))




module.exports = router;