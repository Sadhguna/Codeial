const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const environment = require('../../../config/environment');


module.exports.create_session =async function(req,res){
    

    try{
        let user = await User.findOne({mail : req.body.mail});
        
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message : "Invalid Username/Password"
            });
        }

        return res.json(200,{
            message : "Sign in successfull, here is your token, please keep it safe!",
            data : {
                token : jwt.sign(user.toJSON(),environment.jwt_secret,{expiresIn : '200000'})
            }
        })
    }catch(err){
        console.log('*******err',err);
        return res.json(500,{
            message : "internal Server Error"
        });
    }
}