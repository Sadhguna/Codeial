const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id).then((user)=>{
        return res.render('user_profile',{
            title : "User Profile",
            profile_user : user
        });
    }).catch((err)=>{
        console.log("error in finding the user",err);
    })
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body).then((user)=>{
            req.flash('success','Updated');
            return res.redirect('back');
        }).catch((err)=>{
            
            console.log("error in updating",err);
           
        })
        //return res.redirect('back');
    }else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
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
    req.flash('error', 'Passwords do not match');
        return  res.redirect('back');
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
        req.flash('error', err); 
        return
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
    req.flash('success','logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if(err) {
           // console.log("pavanerror");
             return next(err);
        }else{
            req.flash('success','You have logged out!');
            return res.redirect('/');
        }
    }
    );
   // return res.redirect('/');
}
