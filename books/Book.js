const mongoose = require("mongoose")

mongoose.model("Book", {
    // Title, author, numberofPages, puhlisher
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    numberPages: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: false
    }
});


