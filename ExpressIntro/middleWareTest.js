const express = require('express');
const z = require("zod");

const app = express();
app.use(express.json());

const schema = z.number().array();

function userNameMiddleWare(req, res, next){
    const userName = req.headers.username;
    const pass = req.headers.pass;
    if(userName !== 'Shalini' || pass !== '1234567'){
        res.status(403).json({
            msg : 'User not authenticated!'
        });
    } else {
        next();
    }
}

function kidneyMiddleWare(req, res, next){
    const kidney = parseInt(req.headers.kidney);
    if(!(kidney === 1 || kidney === 2)){
        res.status(404).json({
            msg : "Kidneys are not valid!"
        });
    } else {
        next();
    }
}

app.get("/health-checkup", userNameMiddleWare, kidneyMiddleWare, function(req, res){
    res.status(200).json({
        msg : 'The User is Healthy !'
    });
});

app.post("/health-checkup", function(req,res){
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    if(!response.success){
        res.status(411).json({msg : "Input is Invalid"});
    } else {
        res.send({response});
    }
});

function validateUser(input){
    const schema = z.object({
        email : z.string().email(),
        password : z.string().min(8)
    });

    const response = schema.safeParse(input);
    console.log(response);
    return response;
}

app.post("/verify", function(req,res){
    const response = validateUser(req.body);
    if(response.success){
        res.send({response});
    }
    else{
        res.status(411).json({
            msg : "User not Authenticated!"
        })
    }
})

// Error Handling Middleware should be defined after all routes
app.use(function(err,req,res,next){
    res.status(500).json({
        msg : "Sorry something is up with our server!"
    });
});

app.listen(3000);

