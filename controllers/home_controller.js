const Post = require('../models/posts');
const User = require('../models/user');
// async indicates that there are asynchronous functions inside the function
module.exports.home = async function(req,res){
    //return res.end('<h1> Express is up for Codeial!</h1>');
    //console.log(req.cookies);
    //res.cookie('user_id',50);
    try{
        //await indicates that until the completion of post.find() it should wait and proceed to next step
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
        path : 'comments',
        populate : {
        path : 'user'
        }
    });

    let users = await User.find({});
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