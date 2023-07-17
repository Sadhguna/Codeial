const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//const e = require('express');


passport.use(new LocalStrategy({
    usernameField : 'mail'},
    function(mail,password,done){
        //console.log('hii');
        User.findOne({mail : mail}).then((user)=>{
            if(!user || (password != user.password)){
                console.log("Invalid username/password");
                return done(null,false);
            }else{
                return done(null,user);
            }
        }).catch((err)=>{
            console.log("error in finding user----> passport");
            return done(err);
        })
    }));

    passport.serializeUser(function(user,done){
        //console.log("hii1");
        done(null,user.id);
    });
    
    passport.deserializeUser(function(id,done){
        //console.log("hii2");
        User.findById(id).then((user)=>{
            return done(null,user);
        }).catch((err)=>{
            console.log("error in finding the user---->passport");
            return done(err);
        });
    });
      //console.log("hiii");

    passport.checkAuthentication = function(req,res,next){
        //console.log(req.isAuthenticated());
        if(req.isAuthenticated()){
            //console.log("authentication");
            return next();
        }
        return res.redirect('signin');
    }

    passport.setAuthenticatedUser = function(req,res,next){
        if(req.isAuthenticated()){
            res.locals.user = req.user;
        }
        return next();
    }
    module.exports = passport;