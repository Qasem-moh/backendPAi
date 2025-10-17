const express = require("express");
const router = express.Router();
const { Author,validateAuthor,validateUpdateAuthor } = require("../models/Author");

/**
 * @desc Get all authors
 * @method GET /api/authors
 * @returns {Array} List of authors
 * @access Public
 * 
 */

router.get("/", async (req, res) => {
    try {
        const result = await Author.find()
        // .sort({ firstName: 1 }).select("firstName lastName");
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });

    }
});

/**
 * @desc Get an author by ID
 * @method GET /api/authors/:id
 * @param {number} id - The ID of the author to retrieve
 * @returns {Object} The author with the specified ID
 * @access Public
 */

router.get("/:id", async (req, res) => {
      try {
        const result = await Author.findById(req.params.id)
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(404).send({ message: "author not found" });
    }


})

/**
 * @desc Create a new author
 * @method POST /api/authors
 * @param {string} name - The name of the author
 */

router.post("/", async (req, res) => {
    const { error } = validateAuthor(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    try {
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
        })
        const result = await author.save();
        res.status(201).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });

    }
})


/**
 * @desc Update an author by ID
 * @method PUT /api/authors/:id
 * @param {number} id - The ID of the author to update
 * @param {string} [name] - The updated name of the author
 * @returns {Object} The updated author
 * @access Public   
 * 
 */
router.put("/:id", async (req, res) => {

    const { error } = validateUpdateAuthor(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
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
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

/**
 * @desc Delete an author by ID
 * @method DELETE /api/authors/:id
 * @param {number} id - The ID of the author to delete
 * @returns {Object} A message indicating the deletion status
 * @access Public   
 */

router.delete("/:id", async (req, res) => {
    // const authorIndex = authors.find(a => a.id === parseInt(req.params.id))


try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (author) {
        res.status(200).send({ message: "author has been deleted" });
    } else {
        res.status(404).send({ message: "author not found" });
    }
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
}
})

/**
 * 
 * @param {*} author 
 * @returns 
 */




module.exports = router