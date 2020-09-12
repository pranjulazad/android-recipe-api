var userRoute = require('express').Router();
const statusCode = require('../util/StatusCodes');
var User = require("../models/user");

var {generateToken} = require('./authRoute')

userRoute.post("/insert", (req, res) => {
    var email = req.body.email
    var pwd = req.body.password

    if (email && pwd) {
        User.find().where({ email: email })
            .then((result) => {
                if (result.length == 0) {
                    let salt = crypto.randomBytes(16).toString('base64');
                    let hash = crypto.createHmac('sha512', salt).update(pwd).digest("base64");
                    pwd = salt + "$" + hash;
                    new User({
                        email : email,
                        password : pwd
                    }).save()
                    .then(result => {
                        res.status(statusCode.Created).send(JSON.stringify({ "status": "Success", "message": "User Created Successfully" }))
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    } else {
        res.status(statusCode.BadRequest).send(JSON.stringify({ "status": "failed", "message": "Enter Valid Email/Password" }))
    }
})

userRoute.post("/authtoken", generateToken)

module.exports = userRoute