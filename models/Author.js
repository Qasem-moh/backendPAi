const mongoose = require('mongoose');
const joi = require("joi");

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    

}, { timestamps: true });

const Author = mongoose.model('Author', authorSchema);



function validateAuthor(author) {

    const schema = joi.object({
        firstName: joi.string().min(3).required(),
        lastName: joi.string().min(3).required(),
        nationality: joi.string().min(3).required(),
        image: joi.string
    })
    return schema.validate(author);
}


/**
 * 
 * @param {*} author 
 * @returns 
 */


function validateUpdateAuthor(author) {

    const schema = joi.object({
        firstName: joi.string().min(3),
        lastName: joi.string().min(3),
        nationality: joi.string().min(3),
        iamge: joi.string()
    })
    return schema.validate(author);
}



module.exports = {Author, validateAuthor, validateUpdateAuthor};