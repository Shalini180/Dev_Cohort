const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const directoryPath = "./Files";

app.get("/files", function(req, res){
  fs.readdir(directoryPath, function(err, files){
    if(err){
      console.log("Error Occured " + err);
      return;
    }

    const longPath = files.map(file => path.join(directoryPath, file));
    res.json(
      {
        longPath
      }
    )
  })
});

app.get("/files/:fileName", function(req, res){
  const fileName = req.params.fileName;
  const fullPath = path.join(directoryPath, fileName);
  fs.readFile(fullPath, function(err, data){
    if(err){
      res.status(404).json({
        msg : "fileName not found!"
      })
      console.log("Error Occured !")
      return;
    }

    const fullData = "Data -> " + data.toString();
    res.json({
      fullData
    })
  })
})

app.listen(3000);
module.exports = app;
