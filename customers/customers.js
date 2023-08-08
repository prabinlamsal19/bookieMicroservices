const { error } = require("console");
const express = require("express")
const app = express();
const mongoose = require("mongoose");
require("./Customer");

const Customer = mongoose.model("Customer");
mongoose.connect("mongodb+srv://prabinlamsal:mKVIj2ehxVoKQqhB@cluster0.92rvbxj.mongodb.net/?retryWrites=true&w=majority");

app.use(express.json());

app.post("/customer", (req, res) => {
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };

    var customer = new Customer(newCustomer);

    customer.save().then(() => {
        res.send("Customer created")
    }).catch((error) => {
        res.send(error)
    });
})

app.get("/customers", (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers)
    }).catch((error) => {
        res.send(error);
    })
})

app.get("/customer/:id", (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.json(customer)
        } else {
            res.send("Invalid ID")
        }
    }).catch((error) => {
        res.send(error);
    })
})

app.delete("/customer/:id ", (req, res) => {
    Customer.findByIdAndRemove(req.params.id).then(() => {
        res.send("The user with the given id has been deleted. ")
    }).catch((error) => {
        res.send(error)
    })
})

app.listen(5555, () => {
    console.log("Up and running - Customer service on port 5555")
})