const mongoose = require("mongoose");

const CourseSchema = new  mongoose.Schema({
    course_name : String,
    course_details : String,
    course_price : Number,
    course_instructor : String,
    added_by : String,
    course_banner : String,
    



})

const Course = new mongoose.model("Course",CourseSchema);
module.exports = Course;