const express = require("express")
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Book, validateBook, validateUpdateBook } = require('../models/Book');


/**
 * @desc Get all books
 * @method GET /api/books
 * @access Public
 * @returns {Array} List of books
 * @access Public
 */
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.find().populate('author','firstName lastName');
    res.status(200).json(books);
}
));

/**
 * @desc Get a book by ID
 * @method GET /api/books/:id
 * @param {number} id - The ID of the book to retrieve
 * @returns {Object} The book with the specified ID
 * @access Public
 */
router.get('/:id', asyncHandler(
    async (req, res) => {
        const book = await Book.findById(req.params.id);

        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).send({ message: "book not found" });
        }
    }
));

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
router.post('/', asyncHandler(async (req, res) => {
    const { error } = validateBook(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover
    });
    const createdBook = await book.save();
    res.status(201).json(createdBook);
}
));

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

router.put('/:id', asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    const updateBook = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        }
    }, { new: true });
    res.status(200).send({ message: "book updated", book: updateBook });
}
));

/**
 * @desc Delete a book by ID
 * @method DELETE /api/books/:id
 * @param {number} id - The ID of the book to delete
 * @returns {Object} A message indicating the result of the deletion
 * @access Public
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
        res.status(200).send({ message: "book deleted" });
    } else {
        res.status(404).send({ message: "book not found" });
    }
}));


module.exports = router;