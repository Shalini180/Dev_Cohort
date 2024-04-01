const express = require("express");
const app = express();

//Create an inmemory array
var users = [
  {
    name: "Shalini A",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];
app.use(express.json());

//Query Parameters is used for get parameters
app.get("/", function (req, res) {
  const shaliniKidneys = users[0].kidneys;
  const noOfKidneys = shaliniKidneys.length;
  let noOfHealthyKidneys = 0;
  for (let i = 0; i < noOfKidneys; i++) {
    if (shaliniKidneys[i].healthy) noOfHealthyKidneys += 1;
  }

  const noOfUnhealthyKidney = noOfKidneys - noOfHealthyKidneys;

  res.json({
    noOfKidneys,
    noOfHealthyKidneys,
    noOfUnhealthyKidney,
  });
});

app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });

  res.json({
    msg: "Done!",
  });
});

app.put("/", function (req, res) {
    if(hasAtleastOneBadKidney()){
        for (let i = 0; i < users[0].kidneys.length; i++) {
            users[0].kidneys[i].healthy = true;
          }
        
          res.json({
            msg: "Updated All the kidneys to success",
          });
    }
    else{
        res.status(411).json({
            msg: "No Unhealthy Kidneys found!"
        })
    }
  
});

app.delete("/", function (req, res) {
  if (hasAtleastOneBadKidney()) {
    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidneys.push({
          healthy: true,
        });
      }
    }

    users[0].kidneys = newKidneys;
    res.json({ msg: "Deleted Unhealthy kidneys!" });
  } else {
    res.status(411).json({
      msg: "You have no Bad Kidneys",
    });
  }
});

function hasAtleastOneBadKidney() {
  let output = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].isHealthy) output = true;
  }

  return output;
}

app.listen(3000);
