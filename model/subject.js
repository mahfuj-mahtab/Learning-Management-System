const mongoose = require("mongoose");

const subjectSchema =new  mongoose.Schema({
    subjectname : {
        type:String,
        required:true,
    } , 
    subjectlogo : {
        type:String,
        required:true,
    }  ,
 
    addedby : {
        type:String,
        required:true,
    }  ,
    date : {
        type:Date,
        required:true,
        
    },
   

})
module.exports = mongoose.model("subject", subjectSchema);