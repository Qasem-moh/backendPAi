const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

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


app.get('/', (req, res) => {
    res.send(books);
});
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send({ message: "book not found" });
    }
});

app.post('/books', (req, res) => {
    const { name, author } = req.body;
    if (!name || !author) {
        return res.status(400).send({ message: "name and author are required" });
    }
    const newBook = {
        id: books.length + 1,
        name,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});


app.listen(port, () => console.log("server is running"));