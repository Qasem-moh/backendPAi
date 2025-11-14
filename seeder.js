const { Book } = require("./models/Book")
const { Author}= require("./models/Author")
const { books,authors } = require("./data")
const connectToDB = require("./config/db");
require('dotenv').config();

// Connect to MongoDB
connectToDB();

//import books
const importBooks = async () => { 
    try {
        await Book.insertMany(books);
        console.log("Books imported successfully");
        process.exit();
    } catch (error) {
        console.error("Error importing books:", error);
        process.exit(1);
    }
}

//remove books
const removeBooks = async () => {
    try {
        await Book.deleteMany();
        console.log("Books removed successfully");
        process.exit();
    } catch (error) {
        console.error("Error removing books:", error);
        process.exit(1);
    }
}

//import authors
const importAuthors = async () => { 
    try {
        await Author.insertMany(authors);
        console.log("Authors imported successfully");
        process.exit();
    } catch (error) {
        console.error("Error importing authors:", error);
        process.exit(1);
    }
}

//remove authors
const removeAuthors = async () => {
    try {
        await Author.deleteMany();
        console.log("Authors removed successfully");
        process.exit();
    } catch (error) {
        console.error("Error removing authors:", error);
        process.exit(1);
    }
}   

//execute functions based on command line arguments
if (process.argv[2] === '-import') {
    importBooks();
} else if (process.argv[2] === '-remove') {
    removeBooks();
} 
else if (process.argv[2] === '-importAuthors') {
    importAuthors();
} else if (process.argv[2] === '-removeAuthors') {
    removeAuthors();
}