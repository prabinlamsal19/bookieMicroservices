const { error } = require('console');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("./Book");


const Book = mongoose.model("Book");
mongoose.connect("mongodb+srv://prabinlamsal:mKVIj2ehxVoKQqhB@cluster0.92rvbxj.mongodb.net/?retryWrites=true&w=majority");

app.use(express.json(

));

app.get('/', (req, res) => {
    res.send("Main endpoint from books");
})

app.post("/book", (req, res) => {
    console.log(req.body);

    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    };
    var book = new Book(newBook);

    book.save().then(() => {
        res.send("New book created")
    }).catch((error) => {
        res.send(error);
    })
})


app.listen(4545, () => {
    console.log("Book Service up and running at port 4545");
}) 