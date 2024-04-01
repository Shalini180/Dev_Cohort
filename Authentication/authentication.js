const express = require('express');
const jwt = require('jsonwebtoken');
const jwtPassword = "1234567"

const app = express();
app.use(express.json());

const ALL_USERS = [
    {
        userName : "shalini@gmail.com",
        password :"abcdef",
        name : "Shalini A"
    },
    {
        userName : "oviyan@gmail.com",
        password :"abcdefg",
        name : "oviyan A"
    },
    {
        userName : "latha@gmail.com",
        password :"abcdefgh",
        name : "Latha A"
    }
];

function userExists(userName, password){
    for(let i = 0;i<ALL_USERS.length;i++){
        if(ALL_USERS[i].userName == userName && ALL_USERS[i].password == password)
            return true;
    }

    return false;
}

app.post("/signIn", function(req, res){
    const userName = req.body.userName;
    const password = req.body.password;

    if(!userExists(userName, password)){
        return res.status(403).json({
            msg: "No User found!"
        })
    }

    var token = jwt.sign({userName : userName}, jwtPassword);
    return res.json({
        token
    });
});

app.get("/users", function(req, res){
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            msg: "No token provided!"
        });
    }

    try {
        const response = jwt.verify(token, jwtPassword);
        const userName = response.userName; // Ensure this is included in your token payload

        res.json({
           users: ALL_USERS.filter(function(user){
                return user.userName !== userName;
            })
        });
    } catch(err) {
        console.error(err); // Only in development
        return res.status(403).json({
            msg: "Invalid Token!"
        });
    }
});


app.listen(3000);