import passport from 'passport';
import { OAuth2Strategy as googleStrategy } from 'passport-google-oauth';
import { randomBytes } from 'crypto';
import User from '../models/user.js';
import environment from './environment.js';


//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID : environment.google_client_id ,
        clientSecret :environment.google_client_secret ,
        callbackURL : environment.google_call_back_url 
    },

    function(accessToken ,refreshToken ,profile, done){
        // find a user 
        User.findOne({mail : profile.emails[0].value}).then((user)=>{
            //console.log(profile);
            if(user){
                // if found, set this user as req.user
                return done(null,user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    mail : profile.emails[0].value,
                    name : profile.displayName,
                    password : randomBytes(20).toString('hex')
                }).then(()=>{
                    return done(null,user);
                }).cathch((err)=>{
                    console.log('error in creating user strategy-passport',err);
                    return;
                });
            }
        }).catch((err)=>{
            console.log("error in google strategy-passport",err);
            return;
        });        
    }
));

export default passport;