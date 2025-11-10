const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const { notFound, errorHandler } = require('./middleware/errors');
const connectToDB = require('./config/db');
require('dotenv').config();

// Connect to MongoDB
connectToDB();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/books', require('./router/books'));
app.use('/api/author', require('./router/author'));
app.use('/api/auth', require('./router/auth'));
app.use('/api/users', require('./router/users'));


//error handling middleware
app.use(notFound)

app.use(errorHandler);
// Start the server
app.listen(3000, () =>
    console.log(`server is running ${process.env.node_env} mode on port ${process.env.PORT || 8000}`));