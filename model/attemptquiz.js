const mongoose = require("mongoose");

const attemptQuizSchema =new  mongoose.Schema({
    quizname : {
        type:String,
        required:true,
    } , 
  user:{
    type : String,
    required: true,
  },
  


})
module.exports = mongoose.model("attemptquiz", attemptQuizSchema);