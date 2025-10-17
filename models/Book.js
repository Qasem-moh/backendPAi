const mongoose = require('mongoose');
const Joi = require('joi');
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    // publishedDate: {
    //     type: Date,
    //     required: true
    // },
    // pages: {
    //     type: Number,
    //     required: true,
    //     min: 1  
    // },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    cover:{
        type: String,
        required: true,
        enum:["soft cover","hard cover"]
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

/**
 * @desc Validate book object
 * @param {*} obj 
 * @returns 
 */
function validateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200).required(),
        author: Joi.string().required(),
        description: Joi.string().trim().min(3).max(200).required(),
        price: Joi.number().min(0).max(200).required(),
        cover: Joi.string().valid("soft cover","hard cover").required(),

    })
    return schema.validate(obj);

}

/**
 * 
 * @param {*} obj 
 * @returns 
 */
function validateUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200),
        author: Joi.string().trim().min(3).max(200),
        description: Joi.string().trim().min(3).max(200),
        price: Joi.number().min(0).max(200),
        cover: Joi.string().valid("soft cover","hard cover")
    })
    return schema.validate(obj);

}


module.exports = {Book, validateBook, validateUpdateBook};