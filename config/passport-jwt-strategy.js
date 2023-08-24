import passport from 'passport';
import { Strategy as JWTStrategy } from 'passport-jwt';
import { ExtractJwt as ExtractJWT } from 'passport-jwt';


import environment from './environment.js';
import  User  from '../models/user.js';

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : environment.jwt_secret
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad,done){

    User.findById(jwtPayLoad._id).then((user)=>{
        if(user){
        return done(null,user);
        }
        if(!user){
            return done(null,false);
        }
    }).catch((err)=>{
        console.log("Error in finding user from JWT");
        return;
    });
}));

export default passport;