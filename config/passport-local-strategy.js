import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user.js';



passport.use(new LocalStrategy({
    usernameField : 'mail',
    passReqToCallback : true
    },
    function(req,mail,password,done){
        User.findOne({mail : mail}).then((user)=>{
            if(!user || (password != user.password)){
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }else{
                return done(null,user);
            }
        }).catch((err)=>{
            req.flash('error',err);
            return done(err);
        })
    }));

    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    
    passport.deserializeUser(function(id,done){
        User.findById(id).then((user)=>{
            return done(null,user);
        }).catch((err)=>{
            console.log("error in finding the user---->passport");
            return done(err);
        });
    });

    passport.checkAuthentication = function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/users/signin');
    }

    passport.setAuthenticatedUser = function(req,res,next){
        if(req.isAuthenticated()){
            res.locals.user = req.user;
        }
        return next();
    }
    export default passport;