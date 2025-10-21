const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { User, validateUpdateUser } = require('../models/User');
const {verifyToken} = require('../middleware/verfiyToken')
/**error
 * @desc update a new user
 * @route /api/users/:id
 * @method PUT
 * @access Private
 * 
 */

router.put('/:id', verifyToken, asyncHandler(async (req, res) => {
    if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: "you can update only your account" });
    }
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




module.exports = router;