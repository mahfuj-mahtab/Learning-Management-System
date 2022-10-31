const mongoose = require("mongoose");

const AdminSchema = new  mongoose.Schema({
    name : String,
    email : String,
    password : String,
    profile_pic : String,
    roles : String,
    phone : String,
    user_name : String,
    date_of_joining : String,
    verified : Boolean,
    approved : Boolean,
    email_verified : Boolean,
    phone_verified : Boolean,
    added_by : String,



})

const Admin = new mongoose.model("Admin",AdminSchema);
module.exports = Admin;