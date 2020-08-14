var express = require("express");
var http = require("http");
const bodyParser = require('body-parser');
var mongoose = require("mongoose");
var ip = require("ip");
let stringify = require('json-stringify-safe');

//building server
var app = express();
var server = http.createServer(app);
const host = ip.address();
const port = 3000;


//model imports
var Recipe = require("./models/recipe");

var MONGODB_URI = "mongodb+srv://root:F29vjDQtpf2QjwjA@cluster0-ei6oq.mongodb.net/androidapp-nodejs-recipes?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true})
.then(result => {
    server.listen(port, host, ()=>{
      console.log(`Example app listening at http://${host}:${port}`);
    })
  })
  .catch(err => {
    console.log(err);
  });



// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({ extended: false }));


app.post("/recipes", (req,res)=>{

  //console.log("req : "+stringify(req))  

  const email = req.body.email;
  const recipeName = req.body.recipeName;
  const recipePOM = req.body.recipePOM;
  const imageUrl = req.body.imageUrl;
 
  console.log(`{email : ${email}, 
  recipeName : ${recipeName},
  recipePOM : ${recipePOM},
  imageUrl : ${imageUrl}}`);

  const recipe = new Recipe({
    email: email,
    recipeName: recipeName,
    recipePOM: recipePOM,
    imageUrl: imageUrl
  });
  recipe
    .save()
    .then(result => {
      console.log('Created Recipe');
      res.send("Recipe Created")
    })
    .catch(err => {
      console.log(err);
      res.send("Recipe Creation Process Failed")
    });   

});

app.get("/allrecipes", (req,res)=>{
    Recipe.find()
    .then((recipe) => {
        res.status(200).send(JSON.stringify(recipe));
    }).catch(err=>{
        console.log("ERROR in Find All Recipes path '/allrecipes' : "+err);
    })
     
});


