const mongoose = require("mongoose");

const categorySchema =new  mongoose.Schema({
    categoryname : {
        type:String,
        required:true,
    } , 
    categorylogo : {
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
module.exports = mongoose.model("category", categorySchema);