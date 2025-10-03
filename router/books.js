const express=require("express")
const router=express.Router();
const Joi = require('joi');



const books = [
    { id: 1, name: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 2, name: "1984", author: "George Orwell" },
    { id: 3, name: "Pride and Prejudice", author: "Jane Austen" },
    { id: 4, name: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 5, name: "Moby Dick", author: "Herman Melville" },
    { id: 6, name: "War and Peace", author: "Leo Tolstoy" },
    { id: 7, name: "The Catcher in the Rye", author: "J. D. Salinger" },
    { id: 8, name: "Jane Eyre", author: "Charlotte Brontë" },
    { id: 9, name: "Brave New World", author: "Aldous Huxley" },
    { id: 10, name: "Crime and Punishment", author: "Fyodor Dostoevsky" }
];

/**
 * @desc Get all books
 * @method GET /api/books
 * @access Public
 * @returns {Array} List of books
 * @access Public
 */
router.get('/', (req, res) => {
    res.send(books);
});

/**
 * @desc Get a book by ID
 * @method GET /api/books/:id
 * @param {number} id - The ID of the book to retrieve
 * @returns {Object} The book with the specified ID
 * @access Public
 */
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send({ message: "book not found" });
    }
});

/**
 * @desc Create a new book
 * @method POST /api/books
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 * @param {string} description - The description of the book
 * @param {number} price - The price of the book
 * @param {string} cover - The cover image URL of the book
 * @returns {Object} The created book
 * @access Public
 */
router.post('/', (req, res) => {
    const { error } = validateBook(req.body);
    if(error){
        return res.status(400).send({message:error.details[0].message});
    }
});

/**
 * @desc Update a book by ID
 * @method PUT /api/books/:id
 * @param {number} id - The ID of the book to update
 * @param {string} [title] - The updated title of the book
 * @param {string} [author] - The updated author of the book
 * @param {string} [description] - The updated description of the book
 * @param {number} [price] - The updated price of the book
 * @param {string} [cover] - The updated cover image URL of the book
 * @returns {Object} The updated book
 * @access Public
 */

router.put('/:id', (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if(error){
        return res.status(400).send({message:error.details[0].message});
    }

    const book = books.find(b => b.id === parseInt(req.params.id))

    if (book) {
        return res.status(200).send({ message: "book has been update" });
    }else{
        return res.status(404).send({ message: "book not found" });
    }
});

/**
 * @desc Delete a book by ID
 * @method DELETE /api/books/:id
 * @param {number} id - The ID of the book to delete
 * @returns {Object} A message indicating the result of the deletion
 * @access Public
 */
router.delete('/:id', (req, res) => {
    

    const book = books.find(b => b.id === parseInt(req.params.id))

    if (book) {
        return res.status(200).send({ message: "book has been deleted" });
    }else{
        return res.status(404).send({ message: "book not found" });
    }
});

/**
 * @desc Validate book object
 * @param {*} obj 
 * @returns 
 */
function validateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200).required(),
        author: Joi.string().trim().min(3).max(200).required(),
        description: Joi.string().trim().min(3).max(200).required(),
        price: Joi.number().min(0).max(200).required(),
        cover: Joi.string().trim().required(),

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
        cover: Joi.string().trim(),

    })
    return schema.validate(obj);

}

module.exports=router;