const mongoose = require("mongoose");

const articleDetailsSchema =new  mongoose.Schema({
    coursename : {
        type:String,
        required:true,
    } , 
    articlecoursedetail:{
        type : String,
    },
    coursecategory : {
        type:String,
        required:true,
    }  ,
    coursesubject : {
        type:String,
        required:true,
    }  ,
    coursefee : {
        type:Number,
        required:true,
    }  ,
    courselogo : {
        type:String,
        required:true,
    }  ,
    coursebanner : {
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
    keywords : {
        type:Array,
        
    }  ,

})
module.exports = mongoose.model("articledetails", articleDetailsSchema);