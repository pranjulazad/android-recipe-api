var jwt = require("jsonwebtoken")
const statusCode = require('../util/StatusCodes');
var User = require('../models/user')
var path = require('path')
var fs = require('fs')
var crypto = require("crypto")

var verifyToken = (req,res,next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                var verifyOption = {
                    algorithms : ['RS256']
                }
                fs.readFile(path.join(__dirname, '../secured/PublicKey.txt'), (err,publickey)=>{
                    jwt.verify(authorization[1], publickey, verifyOption, (err, decode)=>{
                        if(!err){
                            console.log(decode)
                            req.user = decode;
                            return next();
                        }
                        console.log(err)
                        res.status(403).send()
                    });
                   
                })
            }
        } catch (err) {
            console.log(err)
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
}

var generateToken = (req,res) => {
    var email = req.body.email
    var pwd = req.body.password

    if(email && pwd){
        User.find().where({email : email})
        .then((user)=>{
            if(!user[0]){
                res.status(404).send({});
            }else{
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                   fs.readFile(path.join(__dirname, '../secured/PrivateKey.txt'), (err,privatekey)=>{
                       if(!err){
                            var signOption = {
                                algorithm : 'RS256'
                            }
                            jwt.sign(JSON.stringify(user[0]), privatekey, signOption, (err,token)=>{
                                
                                if(err){
                                    console.log(err)
                                    return res.status(statusCode.Success).jsonp({ "status": "Failed" , "message" : "Token Generation Failed"})
                                }

                                return res.status(statusCode.Success).jsonp({ "status": "Success" , "message" : "Token Generated", "tokenValue" : token})
                            })
                       }else{
                            return res.status(400).send({errors: ['try After some time ']});
                       }
                   })
                } else {
                    return res.status(400).send({errors: ['Invalid email or password']});
                }
            }
        })
        .catch(err=>{
            res.status(401).send({errors: ['error']});
        });
    }else{
        res.status(statusCode.BadRequest).send(JSON.stringify({ "status": "failed" , "message" : "Enter Valid Email/Password"}))
    }
}

module.exports = { verifyToken, generateToken }