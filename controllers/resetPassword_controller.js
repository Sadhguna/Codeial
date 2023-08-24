import User from '../models/user.js';
import PasswordSchema from '../models/password_reset.js';
import crypto from 'crypto';
import passwordResetMailer from '../mailers/passwordReset_mailer.js';



export function resetPasswordMail(req,res){
    return res.render('reset-passwords',{
        title : "Password-Reset"
    });
}

export function resetPassword(req,res){
    req.flash('success', 'Mail is sent!');
    User.findOne({mail : req.body.mail}).then((data)=>{

        PasswordSchema.create({
            user : data._id,
            token : crypto.randomBytes(20).toString('hex')
        }).then((data)=>{
            passwordResetMailer.newPassword(data);
            return;
        }).catch((err)=>{
            console.log("error",err);
        });
    }).catch((err)=>{
        console.log("error in finding user",err);
    })
    res.redirect('/');
}

export function create_password(req,res){
    return res.render('reset_password',{
        title : "password reset",
        token : req.params.token
    });
}

export function passwordReset(req,res){
    console.log(req.body);
    req.flash('success', 'Successfully password has changed!');
    if(req.body.password !== req.body.confirmpassword){
        req.flash('error', 'Passwords do not match');
        return  res.redirect('back');
        
    }
   
    PasswordSchema.findOne({token : req.params.token}).then((data)=>{
        console.log(data);
        if(data.valid){
            console.log(data.user);
            User.findByIdAndUpdate(data.user,{password : req.body.password}).then((data)=>{
                console.log(data);
                return;}).catch((err)=>{
                    console.log("error1",err);
                });
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


