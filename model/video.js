const mongoose = require("mongoose");

const VideoSchema = new  mongoose.Schema({
    video_title : String,
    video_name : String,
    course_name : String,
    added_by : String,
    
    



})

const Video = new mongoose.model("Video",VideoSchema);
module.exports = Video;