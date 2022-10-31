const mongoose = require("mongoose");

const studentSchema = new  mongoose.Schema({
    name : String,
    email : String,
    password : String,
    profilepic :{
        type:String,
        default : "default.jpg"
    },
    phone : String,
    username : String,
    date_of_joining : Date,
    verified : {
        type:Boolean,
        default : false,
    },
    email_verified :{
        type:Boolean,
        default : false,
    },
    phone_verified : {
        type:Boolean,
        default : false,
    },



})

module.exports  = new mongoose.model("student",studentSchema);