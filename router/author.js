const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Author, validateAuthor, validateUpdateAuthor } = require("../models/Author");
const {verifyTokenAndAdmin }=require("../middleware/verfiyToken")
/**
 * @desc Get all authors
 * @method GET /api/authors
 * @returns {Array} List of authors
 * @access Public
 * 
 */

router.get("/", asyncHandler(
    async (req, res) => {
        const result = await Author.find()
        res.status(200).json(result);
    }
));

/**
 * @desc Get an author by ID
 * @method GET /api/authors/:id
 * @param {number} id - The ID of the author to retrieve
 * @returns {Object} The author with the specified ID
 * @access Public
 */

router.get("/:id", asyncHandler(
    async (req, res) => {
        const result = await Author.findById(req.params.id)
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Author not found" });
        }
    }
))

/**
 * @desc Create a new author
 * @method POST /api/authors
 * @param {string} name - The name of the author
 * access private only admin
 */

router.post("/", verifyTokenAndAdmin, asyncHandler(
    async (req, res) => {
        const { error } = validateAuthor(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
        })
        const result = await author.save();
        res.status(201).json(result);
    }
))


/**
 * @desc Update an author by ID
 * @method PUT /api/authors/:id
 * @param {number} id - The ID of the author to update
 * @param {string} [name] - The updated name of the author
 * @returns {Object} The updated author
 * @access private only admin
 * 
 */
router.put("/:id", verifyTokenAndAdmin, asyncHandler(
    async (req, res) => {

        const { error } = validateUpdateAuthor(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const author = await Author.findByIdAndUpdate(req.params.id, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                image: req.body.image
            }
        },
            { new: true })
        res.status(200).json(author);
    }
))

/**
 * @desc Delete an author by ID
 * @method DELETE /api/authors/:id
 * @param {number} id - The ID of the author to delete
 * @returns {Object} A message indicating the deletion status
 * @access Private only admin
 */

router.delete("/:id",verifyTokenAndAdmin, asyncHandler(
    async (req, res) => {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (author) {
            res.status(200).send({ message: "author has been deleted" });
        } else {
            res.status(404).send({ message: "author not found" });
        }
    }
))
module.exports = router