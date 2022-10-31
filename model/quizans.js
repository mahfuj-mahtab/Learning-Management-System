const mongoose = require("mongoose");

const quizAnsSchema =new  mongoose.Schema({
    quizname : {
        type:String,
        required:true,
    } , 
  question:{
    type : String,
    required: true,
    maxlength: 100,
  },
  option1:{
    type : String,
  },
  option2:{
    type : String,
  },
  option3:{
    type : String,
  },
  option4:{
    type : String,
  },
  correctans:{
    type : String,
    required: true,
  },
    addedby : {
        type:String,
        required:true,
    }  ,
    date : {
        type:Date,
        required:true,
        
    },
    keywords : {
        type:Array,
       
    }  ,

})
module.exports = mongoose.model("quizans", quizAnsSchema);