const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  recipeName : {
      type : String,
      required : true
  },
  recipePOM : {
      type : String,
      required : true
  },
  imageUrl: {
    type: String,
    required: true
  },
});



module.exports = mongoose.model('Recipe', recipeSchema);
