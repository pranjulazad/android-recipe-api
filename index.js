var express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const statusCode = require('./util/StatusCodes');

//let stringify = require('json-stringify-safe');

//model imports
var Recipe = require("./models/recipe");

var MONGODB_URI = "mongodb+srv://root:F29vjDQtpf2QjwjA@cluster0-ei6oq.mongodb.net/androidapp-nodejs-recipes?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true})
.then(result => {
    var server = app.listen(3000, ()=>{
        var host = "localhost";
        var port = server.address().port
        
        console.log(`Example app listening at http://${host}:${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });


var app = express();
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({ extended: false }));


app.post("/postrecipe", (req,res)=>{

  //console.log("req : "+stringify(req))  

  const recipeNameValue = req.body.recipeName;
  const descriptionValue = req.body.description;
  const ingredientsValue = req.body.ingredients;
  const howToMakeValue = req.body.howToMake;
  const imageUrlValue = req.body.imageResource;
 
  console.log(`{recipeName : ${recipeNameValue}, 
  description : ${descriptionValue},
  ingredients : ${ingredientsValue},
  howToMake : ${howToMakeValue}},
  imageURL : ${imageUrlValue}`);

  const recipe = new Recipe({
    recipeName: recipeNameValue,
    description: descriptionValue,
    ingredients: ingredientsValue,
    howToMake : howToMakeValue,
    imageUrl: imageUrlValue
  });

  res.status(statusCode.created).send(JSON.stringify({"status" : "success"}));

  // recipe
  //   .save()
  //   .then(result => {
  //     console.log('Recipe Posted');
  //     res.status(statusCode.created).send(statusCode.success);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status().send(statusCode.BadRequest); // send("Recipe Creation Process Failed")
  //   });   

});

app.get("/allrecipes", (req,res)=>{
    Recipe.find()
    .then((recipe) => {
        res.status(200).send(JSON.stringify(recipe));
    }).catch(err=>{
        console.log("ERROR in Find All Recipes path '/allrecipes' : "+err);
    })
     
});


