const express = require('express');
const app = express();
const port = 3000;
const booksPath = require('./router/books');
const authorPath = require('./router/author');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookStoreDB',
    // { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));


// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/books', booksPath);
app.use('/api/author', authorPath);

// Start the server
app.listen(port, () => console.log("server is running"));