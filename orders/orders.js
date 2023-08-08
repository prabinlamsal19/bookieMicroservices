const express = require("express")
const app = express()
app.use(express.json())
const mongoose = require("mongoose")
const axios = require("axios")

mongoose.connect("mongodb+srv://prabinlamsal:mKVIj2ehxVoKQqhB@cluster0.92rvbxj.mongodb.net/?retryWrites=true&w=majority");

require("./Order")
const Order = mongoose.model("Order")

app.post("/order", (req, res) => {
    var newOrder = {
        CustomerId: new mongoose.Types.ObjectId(req.body.CustomerId),
        BookId: new mongoose.Types.ObjectId(req.body.BookId),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }
    var order = new Order(newOrder)

    order.save().then(() => {
        res.send("The order has been placed.")
    }).catch((err) => {
        if (err) {
            res.send(err)
        }
    })
})

app.get("/orders", (req, res) => {
    Order.find().then((books) => {
        res.json(books)
    }).catch((err) => {
        res.send("Sorry, we encountered an error.")
    })
})

app.get("/order/:id", (req, res) => {
    Order.findById(req.params.id).then((order) => {
        if (order) {
            axios.get("http://localhost:5555/customer/" + order.CustomerId).then((response) => {

                var orderObject = { customerName: response.data.name, bookTitle: '' }

                axios.get("http://localhost:4545/book/" + order.BookId).then((response) => {

                    orderObject.bookTitle = response.data.title
                    res.json(orderObject)

                })
            })
        } else {
            res.send("Invalid Order")
        }
    })
})

app.listen(7777, () => {
    console.log("Up and running- Orders service in port 7777")
})