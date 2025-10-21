const express = require('express');
const app = express();
const booksPath = require('./router/books');
const authorPath = require('./router/author');
const usersPath = require('./router/users');
const authPath=require('./router/auth');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const { notFound, errorHandler } = require('./middleware/errors');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,
    // { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


// Middleware to parse JSON bodies
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/books', booksPath);
app.use('/api/author', authorPath);
app.use('/api/auth',authPath);
app.use('/api/users', usersPath);


//error handling middleware
app.use(notFound)

app.use(errorHandler);
// Start the server
app.listen(3000, () =>
    console.log(`server is running ${process.env.node_env} mode on port ${process.env.PORT || 8000}`));