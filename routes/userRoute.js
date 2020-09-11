var userRoute = require('express').Router;
const statusCode = require('../util/StatusCodes');
var User = require("../models/user");
const { result } = require('underscore');

userRoute.post("/insert", (req,res)=>{
    var email = req.body.email
    var pwd = req.body.password

    if(email && pwd){
        User.find().where({email : email})
            .then((result)=>{
                console.log(result)
            })
            .catch(err=>{
                console.log(err)
            })
    }else{
        res.status(statusCode.BadRequest).send(JSON.stringify({ "status": "failed" , "message" : "Enter Valid Email/Password"}))
    }
})

module.exports = userRoute