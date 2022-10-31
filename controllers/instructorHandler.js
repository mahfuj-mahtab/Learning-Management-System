// const bodyParser = require("body-parser");
// const express = require('express')
// const bcrypt = require("bcrypt");
// const admin = require("../model/admin");
// const instructor = require("../model/instructor");
// const adminController = require("./adminController");

// exports.addinstructor = (req,res)=>{
//     console.log(adminController.sessions.user)
//     try{
//         if(adminController.sessions.user){

//             admin.find({email : adminController.sessions.user},(err,result)=>{
//                 console.log(result[0].name)
//                 res.render("./Admin/AddInstructor",{users : result});
//             })
//         }
//         if(adminController.sessions.user === undefined){
//             console.log("Session Expired");
//             res.redirect("/admin/login")
//         }
//     }
//     catch{
//         console.log("Session Expired");
//         res.redirect("/admin/login")
//     }
// }