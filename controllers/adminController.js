const bodyParser = require("body-parser");
const express = require('express')
const bcrypt = require("bcrypt");
const admin = require("../model/admin");
const flash = require('connect-flash');
require("express-fileupload");
const instructor = require("../model/instructor");
const course = require("../model/course");
const video = require("../model/video");
const articleDetail = require("../model/articledetails");
const articles = require("../model/article");
const categorys = require("../model/category")
const subjects = require("../model/subject");
const article = require("../model/article");
const articledetails = require("../model/articledetails");
const quizDetail = require("../model/quizdetails");
const quizquestions = require("../model/quizans")
var sessions;
exports.adminLogin = (req,res)=>{
    res.render("admin/login",{ messages: null });
}

exports.adminLoginPost = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    admin.find({email : email},(err,result)=>{
        if(result.length == 1){
            bcrypt.compare(password,result[0].password,(err,passMatched)=>{
                if(passMatched){
                    // console.log(result[0])
                    if(result[0].approved == true){
                        sessions = req.session
                        sessions.user = result[0].email
                        console.log(sessions.user)                   
                        res.redirect("/admin/dashboard")
                    }
                    else{
                        console.log("Not Approved");
                        res.redirect("/admin/login");
                    }
                    
                     
                }
                else{
                    res.render("./admin/login",{ messages: "hello" });
                    // console.log(req.flash('info'))
                   
                    console.log("password didnot match")
                    //  res.redirect("/admin/login");

                }
            })
        }
        else{
            // console.log(result.length)
            res.redirect("/admin/login");
        }
    })


}
exports.AdminDashboardHandler = (req,res)=>{
    // console.log(sessions.user)
    try{
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
                if(result.length == 1){
                res.render("./Admin/Dashboard",{users : result});
                }
                else{
                    res.redirect("/admin/login")
                }
            })
        }
        if(sessions.user === undefined){
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
}
exports.adminLogOut = (req,res)=>{
    delete sessions.user;
    res.redirect("/admin/login");
    // sessions.destroy((err)=>{
    // // req.logout();
    // // req.session = null;
    // // delete req.session;
    //     res.redirect("/admin/login");
    // });
}

exports.adminAddUser = (req,res)=>{
    try{ //try catch to handle exception error
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
                if(result.length == 1){
                res.render("./Admin/AddUser",{users : result});
                }
                else{
                    res.redirect("/admin/login")
                }
            })
        }
        if(sessions.user === undefined){ // it means session destroyed
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        //session expired
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
    
}



exports.adminAddUserPost = (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const fullname = req.body.fullname
    const role = req.body.role
    const phone = req.body.phone
    const user_name = req.body.user_name
    
    admin.find({email : email},(err,result)=>{
        if(result.length == 0){
            admin.find({phone : phone},(err,result2)=>{
                if(result2.length == 0){
                    admin.find({user_name : user_name},(err,result3)=>{
                        if(result3.length == 0){
                    bcrypt.hash(password,10,(err,hash)=>{

                        const user = new admin({name : fullname,email : email,password : hash,profile_pic:"default.png",phone : phone,roles:role,user_name : "",verified : false,approved : true,added_by : sessions.user,user_name : user_name});
                        user.save();
                    });
                }
                else{
                    console.log("user name already available in database")
                }
                    });
                }
                
                else{
                    console.log("phone already in database")
                }
            })
        }
        else{
            console.log("Email Already In Database")
        }
    })


    
}

exports.showUser = (req,res)=>{
    try{ //try catch to handle exception error
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
                admin.find((err,results)=>{
                    if(result.length == 1){
                    res.render("./Admin/ShowUser",{users : results,user : result});
                    }
                    else{
                        res.redirect("admin/login")
                    }
                })
            })
        }
        if(sessions.user === undefined){ // it means session destroyed
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        //session expired
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
}

exports.addinstructor = (req,res)=>{
    
    try{
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
                if(result.length == 1){
                res.render("./Admin/AddInstructor",{users : result});
                }
                else{
                    res.redirect("admin/login")
                }
            })
        }
        if(sessions.user === undefined){
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
}

exports.addinstructorPost = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.fullname;
    const phone = req.body.phone;
    const user_name = req.body.user_name;
    const facebook = req.body.facebook;
    const twitter = req.body.twitter;
    const instagram = req.body.instagram;
    const gmail = req.body.gmail;
    const youtube = req.body.youtube;
    instructor.find({email : email},(err,result)=>{
        if(result.length == 0){
            instructor.find({phone : phone},(err,result2)=>{
                if(result2.length == 0){
                    instructor.find({user_name : user_name},(err,result3)=>{
                        if(result3.length == 0){
                    bcrypt.hash(password,10,(err,hash)=>{

                        const user = new instructor({name : name,email : email,password : hash,profile_pic:"default.png",phone : phone,user_name : user_name,verified : false,added_by : sessions.user,facebook_link : facebook,twitter_link : twitter, youtube_link : youtube, instagram_link : instagram, gmail : gmail,verified : true});
                        user.save();
                        res.redirect("/admin/dashboard")

                    });
                }
                else{
                    console.log("user name already available in database")
                }
                    });
                }
                
                else{
                    console.log("phone already in database")
                }
            })
        }
        else{
            console.log("Email Already In Database")
        }
    })

}

exports.showinstructor = (req,res)=>{
    try{
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
                if(result.length == 1){
                instructor.find((err,results)=>{

                    res.render("./Admin/ShowInstructor",{user : result,users : results});
                })
            }else{
                res.redirect("/admin/login")
            }
            })
        }
        if(sessions.user === undefined){
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
}

exports.addCourseDetailsGet = (req,res)=>{
    try{
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
              if(result.length == 1){
                  instructor.find((err,instructors)=>{

                      res.render("./Admin/AddCourseDetails",{users : result,instructors : instructors})
                  })
              }
            })
        }
        if(sessions.user === undefined){
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
    
}

exports.addCourseDetailsPost = (req,res)=>{
    const course_name = req.body.course_name
    const renamed_course_name = course_name.replaceAll(" ","_");
    const course_details = req.body.course_details
    const course_price = req.body.course_price
    const course_instructor = req.body.instructor
    const course_banner = req.files.course_banner_photo
    var renamed_course_banner = Date.now() + course_banner.name
    console.log(course_banner)
    var upload_path  = "./public/images/uploaded/" + renamed_course_banner ;
    console.log(renamed_course_banner)
    course_banner.mv(upload_path,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("File Uploaded")
        }
    })

    const  course_info = new course({course_name : renamed_course_name, course_details : course_details, course_price : course_price, course_instructor : course_instructor, course_banner : renamed_course_banner , added_by : sessions.user});
    course_info.save();
    res.redirect("/admin/dashboard")


}


exports.addVideoGet = (req,res)=>{
    try{
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
              if(result.length == 1){
                  course.find((err,courses)=>{

                      res.render("./Admin/AddVideo",{users : result,courses : courses})
                  })
              }
            })
        }
        if(sessions.user === undefined){
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
    
}


exports.addVideoPost = (req,res)=>{
    const video_title = req.body.video_title
    const course = req.body.course
    const video_name = req.files.video
    var renamed_video = Date.now() + video_name.name.replaceAll(" ","_")
    // console.log(course_banner)
    var upload_path  = "./public/videos/uploaded/" + renamed_video ;
    // console.log(renamed_course_banner)
    video_name.mv(upload_path,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("File Uploaded")
        }
    })

    const  video_info = new video({video_title : video_title, course_name : course,video_name : renamed_video ,added_by : sessions.user});
    video_info.save();
    res.redirect("/admin/dashboard")


}

exports.addArticle = (req,res)=>{
    try{
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
              if(result.length == 1){
                  articleDetail.find((err,articledetails)=>{

                      res.render("./Admin/AddArticle",{users : result,articledetails : articledetails})
                  })
              }
            })
        }
        if(sessions.user === undefined){
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
    
}

exports.addArticleDetails = (req,res)=>{
    try{
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
              if(result.length == 1){
                  instructor.find((err,instructors)=>{

                    categorys.find((err,catresult)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            subjects.find((err,subresult)=>{
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    res.render("./Admin/AddArticleDetails",{users : result,instructors : instructors,catresults:catresult,subresults:subresult})

                                }
                            })
                        }
                    })

                  })
              }
            })
        }
        if(sessions.user === undefined){
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
    
}
exports.addCategory = (req,res)=>{
    try{
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
              if(result.length == 1){
                  instructor.find((err,instructors)=>{

                      res.render("./Admin/AddCategory",{users : result})
                  })
              }
            })
        }
        if(sessions.user === undefined){
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
    
}
exports.addSubject = (req,res)=>{
    try{
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
              if(result.length == 1){
                  instructor.find((err,instructors)=>{

                      res.render("./Admin/AddSubject",{users : result})
                  })
              }
            })
        }
        if(sessions.user === undefined){
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
    
}
exports.addArticleDetailsPost = (req,res)=>{
    const course_name = req.body.course_name
    const articlecoursedetail = req.body.articlecoursedetail
    const course_price = req.body.course_price
    const instructor = req.body.instructor
    const course_banner_photo = req.files.course_banner_photo
    const course_logo = req.files.course_logo
    const category = req.body.category
    const subject = req.body.subject
    let renamed_logo = Date.now() + course_logo.name
    let renamed_banner = Date.now() + course_banner_photo.name
    let upload_path  = "./public/images/uploaded/"
    let  logo = upload_path + renamed_logo
    let banner = upload_path + renamed_banner



    articleDetail.find({coursename : course_name},(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            if(result.length == 0){
                course_banner_photo.mv(banner,(err)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log("Banner Uploaded")
                    }
                })
                course_logo.mv(logo,(err)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log("logo Uploaded")
                    }
                })
                const articleDetails = new articleDetail({
                    coursename : course_name,
                    articlecoursedetail:articlecoursedetail,
                    coursecategory : category,
                    coursesubject : subject,
                    coursefee : course_price,
                    courselogo : renamed_logo,
                    coursebanner : renamed_banner,
                    instructor : instructor,
                    addedby : sessions.user,
                    date : Date.now()
                })
                articleDetails.save()
            res.redirect("/admin/dashboard")

            }
            else{
                console.log("this course name already in database");
            }
        }
    })
 



    
}
exports.addArticlePost = (req,res)=>{
    const articletitle = req.body.articletitle
    const articlebody = req.body.articlebody
    const coursename = req.body.coursename
    articles.find({articletitle : articletitle},(err,result)=>{
        if(result.length == 0){

            const article = new articles({
                articletitle : articletitle,
                articlebody : articlebody,
                coursename : coursename,
                addedby : sessions.user,
                date : Date.now(),
        
            })
            article.save()
            res.redirect("/admin/dashboard")

        }
        else{
            console.log("Article Title Already In Database")
        }
    })
    
}
exports.updateArticlePost = (req,res)=>{
    
    const articletitle = req.body.articletitle
    const articlebody = req.body.articlebody
    const coursename = req.body.coursename
    articles.findOneAndUpdate({_id : req.params.articleId},{articletitle : articletitle,articlebody:articlebody,coursename:coursename},(err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("updated successfully")
                res.redirect("/admin/showarticle")
            }

       
    })
    
}
exports.addCategoryPost = (req,res)=>{
    const categoryname = req.body.categoryname
    const categorylogo = req.files.categorylogo
    const renamedcatewgorylogo = Date.now() + categorylogo.name
    let upload_path  = "./public/images/uploaded/"
    logo = upload_path + renamedcatewgorylogo
   

    categorys.find({categoryname : categoryname},(err,result)=>{
        if(result.length == 0){
            categorylogo.mv(logo,(err)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log("Logo Uploaded")
                }
            })

            const category = new categorys({
                categoryname : categoryname,
                categorylogo : renamedcatewgorylogo,
                addedby : sessions.user,
                date : Date.now(),
        
            })
            category.save()
            res.redirect("/admin/dashboard")

        }
        else{
            console.log("Category Already In Database")
        }
    })
    
}
exports.addSubjectPost = (req,res)=>{
    const subjectname = req.body.subjectname
    const subjectlogo = req.files.subjectlogo
    const renamedsubjectlogo = Date.now() +subjectlogo.name
    let upload_path  = "./public/images/uploaded/"
    logo = upload_path + renamedsubjectlogo
   

    subjects.find({subjectname : subjectname},(err,result)=>{
        if(result.length == 0){
        subjectlogo.mv(logo,(err)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log("Logo Uploaded")
                }
            })

            const subject = new subjects({
                subjectname : subjectname,
                subjectlogo : renamedsubjectlogo,
                addedby : sessions.user,
                date : Date.now(),
        
            })
            subject.save()
            res.redirect("/admin/dashboard")
        }
        else{
            console.log("Category Already In Database")
        }
    })
    
}

exports.showArticle = (req,res)=>{
    try{
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
              if(result.length == 1){
                  articles.find((err,articleresults)=>{

                      res.render("./Admin/ShowArticle",{articleresult : articleresults,users:result})
                  })
              }
            })
        }
        if(sessions.user === undefined){
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
    
}
exports.editArticle = (req,res)=>{
    try{
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
              if(result.length == 1){
                  articles.find((err,articleresults)=>{
                    article.find({_id :  req.params.articleId},(err,results)=>{
                        articledetails.find((err,articleresults)=>{
                            if(err){
                                console.log(err)
                            }
                            else{

                                res.render("./Admin/EditArticle",{users:result,results:results,articleresults : articleresults})
                            }
                        })
                    })

                    //   res.render("./Admin/ShowArticle",{articleresult : articleresults,users:result})
                  })
              }
            })
        }
        if(sessions.user === undefined){
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
    
}

exports.addQuizDetails = (req,res)=>{
    try{
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
              if(result.length == 1){
                 instructor.find((err,result2)=>{
                    categorys.find((err,result3)=>{
                        subjects.find((err,result4)=>{

                            res.render("./Admin/AddQuizDetails",{instructors : result2,users:result, catresults : result3,subresults : result4})
                        })
                    })

                 })

                 
              }
            })
        }
        if(sessions.user === undefined){
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
    
}

exports.addQuizDetailsPost = (req,res)=>{
    const quizname = req.body.quizname
    const quizdetail = req.body.quizdetail
    const quizfee = req.body.quizfee
    const instructor = req.body.instructor
    const quizlogo = req.files.quizlogo
    const category = req.body.category
    const subject = req.body.subject
    let renamed_logo = Date.now() + quizlogo.name
    let upload_path  = "./public/images/uploaded/"
    let  logo = upload_path + renamed_logo
    const url = req.body.url



    quizDetail.find({quizname : quizname},(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            if(result.length == 0){
                
                quizlogo.mv(logo,(err)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log("logo Uploaded")
                    }
                })
                const quizDetails = new quizDetail({
                    quizname : quizname,
                    quizdetail:quizdetail,
                    quizcategory : category,
                    quizsubject : subject,
                    quizfee : quizfee,
                    quizlogo : renamed_logo,
                    instructor : instructor,
                    addedby : sessions.user,
                    date : Date.now(),
                    url:url,
                })
                quizDetails.save()
            res.redirect("/admin/dashboard")

            }
            else{
                console.log("this course name already in database");
            }
        }
    })
 
}


exports.addQuizQuestion = (req,res)=>{
    try{
        if(sessions.user){

            admin.find({email : sessions.user},(err,result)=>{
              if(result.length == 1){
                 instructor.find((err,result2)=>{
                    quizDetail.find((err,result3)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            res.render("./Admin/AddQuizQuestion",{instructors : result2,users:result,quizdetails:result3})
                        }
                    })
                   

                     
                 })

                 
              }
            })
        }
        if(sessions.user === undefined){
            console.log("Session Expired");
            res.redirect("/admin/login")
        }
    }
    catch{
        console.log("Session Expired");
        res.redirect("/admin/login")
    }
    
}


exports.addQuizQuestionPost = (req,res)=>{
    const question = req.body.question
    const option1 = req.body.option1
    const option2 = req.body.option2
    const option3 = req.body.option3
    const option4 = req.body.option4
    const correctans = req.body.correctans
    const quizname = req.body.quizname




             
                const quizquestion = new quizquestions({
                    quizname : quizname,
                    question:question,
                    option1 : option1,
                    option2 : option2,
                    option3 : option3,
                    option4 : option4,
                    correctans : correctans,
                    addedby : sessions.user,
                    date : Date.now()
                })
                quizquestion.save()
            res.redirect("/admin/dashboard")

    
}
