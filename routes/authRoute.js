var jwt = require("jsonwebtoken")
const statusCode = require('../util/StatusCodes');

verifyToken = (req,res,next) => {

}

generateToken = (req,res,next) => {
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
}

module.exports = [verifyToken, generateToken]