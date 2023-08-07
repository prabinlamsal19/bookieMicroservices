const { error } = require("console");
const express = require("express")
const app = express();
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://prabinlamsal:mKVIj2ehxVoKQqhB@cluster0.92rvbxj.mongodb.net/?retryWrites=true&w=majority");
app.use(express());

app.post("/customer", (req, res) => {
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }
    var customer = new Customer(newCustomer)
    customer.save().then(() => {
        res.send("Customer created")
    }).catch((error) => {
        throw error
    });
})

app.listen("5555", () => {
    console.log("Up and running - Customer service")
})