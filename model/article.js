const mongoose = require("mongoose");

const articleSchema =new  mongoose.Schema({
    coursename : {
        type:String,
        required:true,
    } , 
  articletitle:{
    type : String,
    required: true,
    maxlength: 100,
  },
  articlebody:{
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
module.exports = mongoose.model("article", articleSchema);