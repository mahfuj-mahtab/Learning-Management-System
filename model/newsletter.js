const mongoose = require("mongoose");

const NewsletterSchema = new  mongoose.Schema({
    email : String,
    subscribed: Boolean,



})

const  Newsletter = new mongoose.model("Newsletter",NewsletterSchema);
module.exports = Newsletter;