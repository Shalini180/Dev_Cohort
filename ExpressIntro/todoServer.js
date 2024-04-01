const express = require("express");
const bodyParser = require('body-parser');

const todo = [
    {
        id : 1,
        title : "Get Up",
        completed : true,
        description : "Get Up in the morning"
    },
    {
        id : 2,
        title : "Bath",
        completed : false,
        description : "Take a bath"
    }
]

const app = express();
app.use(bodyParser.json());
let idNumber = todo.length;

app.get("/todos", (req, res) => {
    res.json({
        todo
    })
})

app.get("/todos/:id", (req, res) => {
    const id = req.params.id;
    const found = todo.find(item => item.id == id);
    if(found){
        res.json({
            found
        })
    }
    else{
        res.status(404).json({
            msg: "Todo Not Found"
        })
    }

})

app.post("/todos", (req,res) => {
    idNumber = idNumber + 1;
    const id = idNumber;
    const { title, completed, description } = req.body;
    
    todo.push({
        id : id,
        title : title,
        completed : completed,
        description : description
    })

    res.json({
        msg : "Todo Added!"
    })
})

app.put("/todos/:id", (req, res) => {
    const id = req.params.id;
    let found = todo.find((item) => item.id == id);
    if(found){
        const title = req.body.title;
        const completed = req.body.completed;
        for(let i = 0;i<todo.length;i++){
            if(todo[i].id == id){
                todo[i].title = title;
                todo[i].completed = completed;
            }
        }

        res.json({
            msg :  "Updated SuccessFully!"
        })
    }
    else{
        res.status(404).json({
            msg : "Todo item not found!"
        })
    }
})

app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    let found = todo.find((item) => item.id == id);
    if(found){
        for(let i = 0;i<todo.length;i++){
            if(todo[i].id == id){
                todo.splice(i, 1)
            }
        }

        res.json({
            msg :  "Deleted SuccessFully!"
        })
    }
    else{
        res.status(404).json({
            msg : "Todo item not found!"
        })
    }
})

app.listen(3000);
