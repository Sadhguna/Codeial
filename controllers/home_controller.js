const Post = require('../models/posts');
const User = require('../models/user');

module.exports.home = async function(req,res){
    //return res.end('<h1> Express is up for Codeial!</h1>');
    //console.log(req.cookies);
    //res.cookie('user_id',50);
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
        path : 'comments',
        populate : {
        path : 'user'
        }
    });

    let users = await User.find();
        return res.render('home',{
            title : 'Codeial | home',
            posts : posts,
            all_users : users
    });
    }catch(err){
        console.log("error",err);
        return;
    }

}