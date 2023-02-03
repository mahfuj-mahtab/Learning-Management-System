const express = require("express");
const app = express();
const ejs = require("ejs");
// const router = require("./Router/router");
const mongoose = require("mongoose");
const admin = require("./model/admin");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const {adminLogin,adminLoginPost,AdminDashboardHandler,adminLogOut,adminAddUser,adminAddUserPost,showUser,addinstructor,addinstructorPost,showinstructor,addCourseDetailsGet,addCourseDetailsPost,addVideoGet,addVideoPost,addArticle,addArticleDetails,addArticleDetailsPost,addArticlePost,addCategory,addCategoryPost,addSubject,addSubjectPost,showArticle,editArticle,updateArticlePost,addQuizDetails,addQuizDetailsPost,addQuizQuestion,addQuizQuestionPost} = require("./controllers/adminController");
const {index,studentLogin,showCourse,showSingleArticle,register,registerPost,login,showQuiz,attemptquiz} = require("./controllers/index");
const cookirParser = require("cookie-parser");
const session = require('express-session')
const flash = require('connect-flash');
// const x = require("./model/x");
const fileUpload = require("express-fileupload");

// const f = require("froala-editor");


// database connection
mongoose.connect("mongodb://127.0.0.1:27017/TutorialHubs",{ useUnifiedTopology: true, useNewUrlParser: true})



// app.use(router);
app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookirParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
  // app.use(f())
app.use(flash());
app.use(fileUpload());
// bcrypt.hash("mohot",10,(err,hash)=>{

//     const user = new admin({name : "Mahfuj Mahtab Mohot",email : "mohotmohot1@gmail.com",password : hash,profile_pic:"default.png",phone : "01765045048",roles:"admin",user_name : "mohot",verified : "true",approved : true});
//     user.save();
// });

// const cookie = 

// app.get('/flash', function(req, res){
//   // Set a flash message by passing the key, followed by the value, to req.flash().
//   req.flash('info', 'Flash is back!')
//   res.redirect('/');
// });


app.get("/",index)
app.get("/admin/login",adminLogin)
app.post("/admin/login",adminLoginPost);
app.get("/admin/dashboard",AdminDashboardHandler);
app.get("/admin/logout",adminLogOut);
app.get("/admin/adduser",adminAddUser);
app.post("/admin/adduser", adminAddUserPost);
app.get("/admin/showuser",showUser);
app.get("/admin/addinstructor",addinstructor)
app.post("/admin/addinstructor",addinstructorPost)
app.get("/admin/showinstructor",showinstructor)
app.get("/admin/course/addcoursedetails",addCourseDetailsGet)
app.post("/admin/course/addcoursedetails",addCourseDetailsPost)
app.get("/admin/course/addvideo",addVideoGet)
app.post("/admin/course/addvideo",addVideoPost)
app.get("/student/login", studentLogin)
app.get("/course/:cId",showCourse)
app.get("/course/:cId/:articleId",showSingleArticle)
app.get("/admin/addarticle",addArticle)
app.get("/admin/addarticledetails", addArticleDetails)
app.post("/admin/addarticledetails", addArticleDetailsPost)
app.post("/admin/addarticle", addArticlePost)
app.get("/admin/addcategory",addCategory)
app.post("/admin/addcategory",addCategoryPost)
app.get("/admin/addsubject",addSubject)
app.post("/admin/addsubject",addSubjectPost)
app.get("/admin/showarticle",showArticle)
app.get("/admin/article/edit/:articleId",editArticle)
app.post("/admin/updatearticle/:articleId",updateArticlePost)
app.get("/admin/addquizdetails", addQuizDetails);
app.post("/admin/addquizdetails", addQuizDetailsPost);
app.post("/admin/addquizquestion", addQuizQuestionPost);
app.get("/admin/addquizquestion", addQuizQuestion);
app.get("/register",register)
app.post("/signup",registerPost)
app.post("/login",login)
app.get("/showquiz/:quizId",showQuiz)
app.post("/done/:quizId",attemptquiz)
app.listen(3000,(req,res)=>{

})


