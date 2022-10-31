const mongoose = require("mongoose");

const InstructorSchema = new  mongoose.Schema({
    name : String,
    email : String,
    password : String,
    profile_pic : String,
    phone : String,
    user_name : String,
    date_of_joining : String,
    verified : Boolean,
    email_verified : Boolean,
    phone_verified : Boolean,
    added_by : String,
    facebook_link : String,
    instagram_link : String,
    youtube_link : String,
    twitter_link : String,
    gmail : String,



})

const Instructor = new mongoose.model("Instructor",InstructorSchema);
module.exports = Instructor;