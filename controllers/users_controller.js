const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title : "User Profile"
    });
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('profile');
    }
    return res.render('user_sign_up',{
        title : "Codeial | Sign Up"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('profile');
    }
    return res.render('user_sign_in',{
        title : "Codeial | Sign In"
    })
}

module.exports.create = function(req,res){
     // console.log(req.body);
    // // return res.end('<h1>pavan</h1>');
    // //console.log(req.body);
    // console.log(req.body.password);
    // console.log(req.body.confirm_password);
     if(req.body.password !== req.body.confirm_password){
    //    // return res.render('user_sign_in');
        return  res.end("password mismatch");
    //    // return res.redirect('back');
     }
    User.findOne({mail : req.body.mail}
    //     ,(err,data)=>{
    //     if(!data){
    //         User.create({
    //             mail : req.body.mail,
    //             password : req.body.password,
    //             name : req.body.name
    //         }).then(()=>{
    //             return res.render('user_sign_in');
    //         }
    //         ).catch((err)=>{
    //             console.log("error in signing up",err);
    //         });
    //     }else if(data){
    //         return res.render('user_sign_in');
    //         //console.log("error in signing up",err);
    //     }else{
    //         console.log("error in signing up",err);
    //     }
    // }
    ).then((data)=>{
        if(data){
            //console.log(data);
            return res.end("mail already exists");
            }
        if(!data){
            User.create({
                mail : req.body.mail,
                password : req.body.password,
                //confirm_password : req.body.confirm_password,
                name : req.body.name
            });
            return res.redirect('signin');
        }
    }).catch((err)=>{
        console.log("error in signing up",err);
    })
    // .then((data)=>{
    //   //  console.log(data);
    //    // return res.end("mail already exists");
    //   //  return;
    //    return res.render('user_sign_in');
    // }).catch((err) => {
    //     console.log("error in signing up",err);
    // });
    
    
    // User.findOne({email : req.body.email},function(err,user){
    //     if(err){
    //         console.log("error in signing up",err);
    //         return;
    //     }
    //     if(!user){
    //         User.create(req.body,function(err,user){
    //             if(err){
    //                 console.log("error in signing up",err);
    //                 return;
    //             }
    //             return res.redirect('/users/signin')
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // })
}


module.exports.create_session = function(req,res){
    // console.log(req.body);
    // return res.end('<h1>pavan</h1>');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if(err) {
           // console.log("pavanerror");
             return next(err);
        }else{
            return res.redirect('/');
        }
    }
    );
   // return res.redirect('/');
}
