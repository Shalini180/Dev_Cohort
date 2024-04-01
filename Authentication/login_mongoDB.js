const mongoose = require("mongoose")
const express = require("express");
const app = express();

app.use(express.json())

mongoose.connect("");

const User = mongoose/module('Users',{name: String, email: String, password: String});

const user = new User({
    name: "Shalini A",
    email: "shalini@gmail.com",
    password: '123456'
});

user.save();

app.post("/signup", function(req, res){
    const userName = req.body.userName;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = User.findOne({email : username});
    if(existingUser){
        return res.status(400).send("UserName already exists")
    }
    const user = new User({
        name: name,
        email: userName,
        password: password
    });
    user.save();

    return res.status(200).json({
        msg: "User Created Successfully!"
    })
})
