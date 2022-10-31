const mongoose = require("mongoose");

const quizDetailsSchema =new  mongoose.Schema({
    quizname : {
        type:String,
        required:true,
    } , 
    quizdetail:{
        type : String,
    },
    quizcategory : {
        type:String,
        required:true,
    }  ,
    quizsubject : {
        type:String,
        required:true,
        
    }  ,
    quizfee : {
        type:Number,
        default : 0,
    }  ,
    quizlogo : {
        type:String,
        required:true,
    }  ,
    instructor:{
        type : Array,

    },
    addedby : {
        type:String,
        required:true,
    }  ,
    date : {
        type:Date,
        required:true,
        
    },
    url:{
        type:String,
    },
    keywords : {
        type:Array,
        
    }  ,

})
module.exports = mongoose.model("quizdetail", quizDetailsSchema);