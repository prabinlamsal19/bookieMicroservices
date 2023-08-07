const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://prabinlamsal:mKVIj2ehxVoKQqhB@cluster0.92rvbxj.mongodb.net/?retryWrites=true&w=majority");

app.get('/', (req, res) => {
    res.send("Main endpoint from books");
})

app.listen(4545, () => {
    console.log("Book Service up and running at port 4545");
})