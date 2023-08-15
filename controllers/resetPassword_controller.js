const User = require('../models/user');
const PasswordSchema = require('../models/password_reset');
const crypto = require('crypto');
const passwordResetMailer = require('../mailers/passwordReset_mailer');



module.exports.resetPasswordMail = function(req,res){
    return res.render('reset-passwords',{
        title : "Password-Reset"
    });
}

module.exports.resetPassword = function(req,res){
    //console.log(req.body.mail);
    req.flash('success', 'Mail is sent!');
    User.findOne({mail : req.body.mail}).then((data)=>{
        //console.log(data);

        PasswordSchema.create({
            user : data._id,
            token : crypto.randomBytes(20).toString('hex')
        }).then((data)=>{
            passwordResetMailer.newPassword(data);
            //console.log(data);
            return;
        }).catch((err)=>{
            console.log("error",err);
        });
    }).catch((err)=>{
        console.log("error in finding user",err);
    })
    res.redirect('/');
}

module.exports.create_password = function(req,res){
    return res.render('reset_password',{
        title : "password reset",
        token : req.params.token
    });
}

module.exports.passwordReset = function(req,res){
    console.log(req.body);
    req.flash('success', 'Successfully password has changed!');
    if(req.body.password !== req.body.confirmpassword){
        req.flash('error', 'Passwords do not match');
        return  res.redirect('back');
        
    }
    //console.log('hii');
    PasswordSchema.findOne({token : req.params.token}).then((data)=>{
        console.log(data);
        if(data.valid){
            console.log(data.user);
            User.findByIdAndUpdate(data.user,{password : req.body.password}).then((data)=>{
                console.log(data);
                return;}).catch((err)=>{
                    console.log("error1",err);
                });
           // User.findOneAndUpdate({_id : data.id},{password : req.body.password})
            PasswordSchema.findOneAndUpdate({token : req.params.token},{valid : false}).then((data)=>{
                console.log(data);
                return;
            }).catch((err)=>{
                console.log("error2",err);
            });
            req.flash('sucess', 'Password is updated');
        }
        return res.redirect('/');
    }).catch((err)=>{
        console.log("error3",err);
    });
}


