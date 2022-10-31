const { render } = require("ejs");
const courses = require("../model/course");
const articleDetails = require("../model/articledetails");
const article = require("../model/article");
const passwordValidator = require("password-validator");
const User = require("../model/student");
const bcrypt = require('bcrypt');
const questions = require("../model/quizans")
const quizs = require("../model/quizdetails");
let sessions;



exports.index = (req,res)=>{
    

    
    articleDetails.find((err,result)=>{
        article.find({
            coursename : result.coursename
        },(err,articleresult)=>{

            res.render("index",{results : result,articleresults : articleresult});
        })
    })
}

exports.studentLogin = (req,res)=>{
    
}

exports.showCourse = (req,res)=>{
    
    articleDetails.find({coursename : req.params.cId.replaceAll("_"," ")},(err,articledetailsresult)=>{
        if(err || articledetailsresult.length == 0){
            console.log(err)
            res.redirect("/")

        }
        else{
            article.find({coursename : req.params.cId.replaceAll("_"," ")},(err,articleresult)=>{
                if(err || articleresult.length == 0){
                    console.log(err)
            res.redirect("/")

                }
                else{

                    res.render("ArticleShow",{articledetailsresults : articledetailsresult, articleresults : articleresult});
                }
            })

        }
    })
    
}
exports.showSingleArticle = (req,res)=>{
    
    article.find({coursename : req.params.cId.replaceAll("_"," ")},(err,result)=>{
        if(err || result.length == 0){
            console.log(err)
            res.redirect("/")
        }
        else{
        article.find({articletitle : req.params.articleId.replaceAll("_"," ")},(err,articleresult)=>{
            if(err || articleresult.length == 0){
                console.log(err)
                res.redirect("/")
            }
            else{
                articleDetails.find({coursename : req.params.cId.replaceAll("_"," ")},(err,articleDetailsResult)=>{
                    
                    if(err || articleDetailsResult.length == 0){
                        console.log(err)
                        res.redirect("/")
                    }
                    else{
                    res.render("SingleArticle",{results : result,articleresult:articleresult,articleDetailsResults : articleDetailsResult});
                    }
                })
            

            }
        })
    }
    })
    
}

exports.register=(req,res)=>{
    res.render("register")
}
exports.registerPost=(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const userName = req.body.userName;
    const password = req.body.password;

    var passwordSchema = new passwordValidator();
    passwordSchema.is().min(8);
    passwordSchema.is().max(100);
    passwordSchema.has().uppercase();
    passwordSchema.has().lowercase();
    passwordSchema.has().digits(2);
    User.find({ email: email }, (err, result) => {
        if (result.length == 0) {
            User.find({ username: userName }, (err, result) => {
                if (result.length == 0) {
                    if (passwordSchema.validate(password)) {
                        bcrypt.hash(password, 10, function (err, hash) {
                            var saltedPass = hash;
                            const user = new User({
                                name: name,
                                email: email,
                                username: userName,
                                password: saltedPass,
                                date_of_joining : Date.now(),
                                
                               
                            })
                            user.save();
                        })
                        

                    }
                    else {
                        console.log("password need to change");
                    }

                }
                else {
                    console.log("Sorry Username is not available");
                    res.redirect("register");
                }

            })
        }
        else {
            console.log("Sorry Email Already Exist");
            res.redirect("register");
        }
    }
    )
}

exports.login = (req,res)=>{
    console.log(req.body)
    var email = req.body.email;
    var password = req.body.password;
    // console.log(userName)
    User.find({ email: email }, function (err, user) {
        // console.log(user[0].name)
        // console.log(user[0].password)
        // console.log(password)
        // console.log(user.length)
        if (user.length == 1) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result == true) {
                    sessions = req.session
                    sessions.user = user[0].username
                    console.log(sessions.user)
                    // res.redirect("/profile/" + user[0].username);
                    res.redirect("/")

                }
                else {
                    console.log("password did not match")
                     res.redirect("register")

                }
            })
        }
        else {
            res.redirect("register")
            console.log("user more than 1")
        }
    })
}

exports.showQuiz = (req,res)=>{
    quizs.find({quizname : req.params.quizId},(err,result)=>{
        if(err || result.length == 0){
             console.log(err)
             res.redirect("/")
        }
        else{   

            
            res.render("ShowQuiz",{results:result})
        }
    })
}

exports.attemptquiz = (req,res)=>{
    console.log(req.params.quizId)
}