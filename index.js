const path = require('path');
var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const statusCode = require('./util/StatusCodes');
const _ = require('underscore');

//let stringify = require('json-stringify-safe');

//Import Recipe model
var Recipe = require("./models/recipe");

var MONGODB_URI = "mongodb+srv://root:F29vjDQtpf2QjwjA@cluster0-ei6oq.mongodb.net/androidapp-nodejs-recipes?retryWrites=true&w=majority";

var app = express();
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(express.static('public'))

//support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({ extended: false }));


app.post("/postrecipe", (req, res) => {

  //console.log("req : "+stringify(req))  

  const recipeNameValue = req.body.recipeName;
  const descriptionValue = req.body.description;
  const ingredientsValue = req.body.ingredients;
  const howToMakeValue = req.body.howToMake;
  const imageUrlValue = req.body.imageUrl;

  console.log(`{recipeName : ${recipeNameValue}, 
  description : ${descriptionValue},
  ingredients : ${ingredientsValue},
  howToMake : ${howToMakeValue},
  imageResource : ${imageUrlValue}
}`);

  if (!_.isEmpty(recipeNameValue) && !_.isEmpty(descriptionValue) &&
    !_.isEmpty(ingredientsValue) && !_.isEmpty(howToMakeValue) && imageUrlValue != null ) {

      const recipe = new Recipe({
      recipeName: recipeNameValue,
      description: descriptionValue,
      ingredients: ingredientsValue,
      howToMake: howToMakeValue,
      imageUrl: imageUrlValue
    });

    //res.status(statusCode.Created).send(JSON.stringify([{"status" : "success"}]));

    recipe
      .save()
      .then(result => {
        console.log('Recipe Posted');
        res.status(statusCode.Created).send(JSON.stringify({ "status": "success" }));
      })
      .catch(err => {
        console.log("ERROR in post a Recipe path '/postrecipe' : " + err);
        res.status(statusCode.BadRequest).send(JSON.stringify({ "status": "failed" })); // send("Recipe Creation Process Failed")
      });

  } else {
    res.status(statusCode.BadRequest).send(JSON.stringify({ "status": "failed" }));
  }

});

app.get("/allrecipes", (req, res) => {
  Recipe.find()
    .then((recipe) => {
      res.status(200).send(JSON.stringify(recipe));
    }).catch(err => {
      console.log("ERROR in Find All Recipes path '/allrecipes' : " + err);
      res.status(statusCode.BadRequest).send(JSON.stringify([{ "status": "failed" }]));
    })

});


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    var server = app.listen(3000, () => {
      var host = "localhost";
      var port = server.address().port

      console.log(`Example app listening at http://${host}:${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });



