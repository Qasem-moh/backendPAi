const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { User, validateUpdateUser } = require('../models/User');
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verfiyToken')

/**
 * @desc update a new user
 * @route /api/users/:id
 * @method PUT
 * @access Private
 * 
 */

router.put('/:id', verifyTokenAndAuthorization, asyncHandler(async (req, res) => {
  
    const { error } = validateUpdateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        }
    }, { new: true }).select('-password');
    res.status(200).json(updateUser);
}));

/**
 * @desc get all users
 * @route /api/users
 * @method GET
 * @access Private (Admin only)
 * 
 */

router.get('/', verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
}));


/**
 * @desc get all users
 * @route /api/users
 * @method GET
 * @access Private (Admin only)
 * 
 */

router.get('/', verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
}));


/**
 * @desc get user by id
 * @route /api/users/:id
 * @method GET
 * @access Private (Admin only)
 * 
 */

router.get('/:id', verifyTokenAndAuthorization, asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
}));

/**
 * @desc delete user by id
 * @route /api/users/:id
 * @method DELETE
 * @access Private (Admin only)
 * 
 */

router.delete('/:id', verifyTokenAndAuthorization, asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
}));

module.exports = router;