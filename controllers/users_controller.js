import User from '../models/user.js';
import fs from 'fs';
import { join } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function profile(req,res){
    // let login_user = User.findById(req.user.id);
    // console.log(login_user.name);
    User.findById(req.params.id).populate({path : 'friendships',populate :{ path : 'to_user', path : 'from_user'}}).then((user)=>{
       // console.log(user.friendships);
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
    //     User.findByIdAndUpdate(req.params.id,req.body).then((user)=>{
    //         req.flash('success','Updated');
    //         return res.redirect('back');
    //     }).catch((err)=>{
            
    //         console.log("error in updating",err);
           
    //     })
        //return res.redirect('back');
        try{
            let user = await User.findById(req.params.id);
            //console.log(user);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******Multer Error',err);
                }
                //console.log(req.file);
                user.name = req.body.name;
                user.mail = req.body.mail;
                //console.log(req.file);
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
           // console.log("hiii1`");
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized');
        //console.log("hii");
        return res.status(401).send('Unauthorized');
    }
}

export function signUp(req,res){
    if(req.isAuthenticated()){
        return res.redirect('profile');
    }
    return res.render('user_sign_up',{
        title : "Codeial | Sign Up"
    })
}

export function signIn(req,res){
    if(req.isAuthenticated()){
        return res.redirect('profile');
    }
    return res.render('user_sign_in',{
        title : "Codeial | Sign In"
    })
}

export function create(req,res){
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
        else if(!data){
            User.create({
                mail : req.body.mail,
                password : req.body.password,
                //confirm_password : req.body.confirm_password,
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


export function create_session(req,res){
    // console.log(req.body);
    // return res.end('<h1>pavan</h1>');
    req.flash('success','logged in successfully');
    return res.redirect('/');
}

export function destroySession(req,res){
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

