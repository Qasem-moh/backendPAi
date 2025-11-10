const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,

    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

//Geberate token
userSchema.methods.generateToken = function () { 
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET);;
}
//user model
const User = mongoose.model('User', userSchema);

// Validation function for registering a new user
const validateRegisterUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required().trim().min(5).max(255),
        password: Joi.string().min(6).required().trim().min(6).max(100)
    });
    return schema.validate(user);
};

//validation function for login can be added similarly
const validateLoginUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required().trim().min(5).max(255),
        password: Joi.string().min(6).required().trim().min(6).max(100)
    });
    return schema.validate(user);
};
//validation function for update user can be added similarly
const validateUpdateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(100).optional(),
        email: Joi.string().email().optional().trim().min(5).max(255),
        password: Joi.string().min(6).optional().trim().min(6).max(100)
    });
    return schema.validate(user);
};

module.exports = { User, validateRegisterUser,validateLoginUser,validateUpdateUser };