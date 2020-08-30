const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  recipeName: {
    type: String,
    required: true
  },
  description : {
      type : String,
      required : true
  },
  ingredients : {
      type : String,
      required : true
  },
  howToMake : {
      type : String,
      required : true
  },
  imagesUrl: {
    type: Array,
    required: true
  },
});



module.exports = mongoose.model('Recipe', recipeSchema);
