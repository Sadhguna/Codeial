const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


const environment = require('./environment');
const User = require('../models/user');

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

module.exports = passport;