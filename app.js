const express = require('express');
const app = express();
const port = 3000;
const booksPath = require('./router/books');


app.use(express.json());

app.use('/api/books', booksPath);

app.listen(port, () => console.log("server is running"));