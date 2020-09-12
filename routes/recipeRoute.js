var recipeRoute = require('express').Router();
const statusCode = require('../util/StatusCodes');
var Recipe = require("../models/recipe");


recipeRoute.post("/postrecipe", (req, res) => {

    //console.log("req : "+stringify(req))  
  
    const recipeNameValue = req.body.recipeName;
    const descriptionValue = req.body.description;
    const ingredientsValue = req.body.ingredients;
    const howToMakeValue = req.body.howToMake;
    const imagesUrlValue = req.body.imagesUrl;
  
    console.log(`{recipeName : ${recipeNameValue}, 
    description : ${descriptionValue},
    ingredients : ${ingredientsValue},
    howToMake : ${howToMakeValue},
    imageResource : ${imagesUrlValue}
  }`);
  
    if (!_.isEmpty(recipeNameValue) && !_.isEmpty(descriptionValue) &&
      !_.isEmpty(ingredientsValue) && !_.isEmpty(howToMakeValue) && imagesUrlValue != null ) {
  
        const recipe = new Recipe({
        recipeName: recipeNameValue,
        description: descriptionValue,
        ingredients: ingredientsValue,
        howToMake: howToMakeValue,
        imagesUrl: imagesUrlValue
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
  
  recipeRoute.get("/allrecipes", (req, res) => {
    Recipe.find()
      .then((recipe) => {
        res.status(200).send(JSON.stringify(recipe));
      }).catch(err => {
        console.log("ERROR in Find All Recipes path '/allrecipes' : " + err);
        res.status(statusCode.BadRequest).send(JSON.stringify([{ "status": "failed" }]));
      })
  
  });

  module.exports = recipeRoute