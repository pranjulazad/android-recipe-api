const mongoose = require('mongoose');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate : [ isEmail, 'invalid email, Please Enter the correct Email' ]
  },
  password : {
      type : String,
      required : true
  }
});


module.exports = mongoose.model('User', userSchema);
