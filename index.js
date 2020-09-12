const path = require('path');
var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PropReader = require('properties-reader');
const reader = PropReader(path.join(__dirname, "/secured/MongoDBConfig.properties"))
const _ = require('underscore');

//let stringify = require('json-stringify-safe');

//routes
var recipeRoute = require('./routes/recipeRoute')
var userRoute = require('./routes/userRoute')
var { verifyToken } = require('./routes/authRoute')

//Initializing express app
var app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(express.static('public'))

app.use('/recipe', [verifyToken, recipeRoute])
app.use('/user', userRoute)

//support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({ extended: false }));

//MongoDBURL
var MONGODB_URI = reader.get("mongodb.url");

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



