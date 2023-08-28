import User from '../models/user.js';
import fs from 'fs';
import { join } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function profile(req,res){
    User.findById(req.params.id).populate({path : 'friendships',populate :{ path : 'to_user', path : 'from_user'}}).then((user)=>{
        return res.render('user_profile',{
            title : "User Profile",
            profile_user : user,
        });
    }).catch((err)=>{
        console.log("error in finding the user",err);
    })
}

export async function update(req,res){
     if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******Multer Error',err);
                }
                user.name = req.body.name;
                user.mail = req.body.mail;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(join(__dirname,'..',user.avatar));
                    }
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

export function signUp(req,res){
    if(req.isAuthenticated()){
        return res.redirect('profile');
    }
    return res.render('user_sign_up',{
        title : "Chatting Engine | Sign Up"
    })
}

export function signIn(req,res){
    if(req.isAuthenticated()){
        return res.redirect('profile');
    }
    return res.render('user_sign_in',{
        title : "Chatting Engine | Sign In"
    })
}

export function create(req,res){
     if(req.body.password !== req.body.confirm_password){
    req.flash('error', 'Passwords do not match');
        return  res.redirect('back');
     }
    User.findOne({mail : req.body.mail}
    ).then((data)=>{
        if(data){
            return res.end("mail already exists");
            }
        else if(!data){
            User.create({
                mail : req.body.mail,
                password : req.body.password,
                name : req.body.name
            });
            return res.redirect('signin');
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    }).catch((err)=>{
        req.flash('error', err); 
        return
    })
  
}


export function create_session(req,res){
    req.flash('success','logged in successfully');
    return res.redirect('/');
}

export function destroySession(req,res){
    req.logout(function(err) {
        if(err) {
             return next(err);
        }else{
            req.flash('success','You have logged out!');
            return res.redirect('/');
        }
    }
    );

}

