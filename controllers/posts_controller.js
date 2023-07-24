//const { content } = require('har-validator');
const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create =async function(req,res){
    try{
        await Post.create({
            content : req.body.content,
            user : req.user._id
        });
        return res.redirect('back');
    }
    catch(err){
        console.log("error",err);
        return;
    }
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        // so there is no need to write _id
        if(post.user == req.user.id){
            //let id = req.params.id;
            await Post.findByIdAndDelete(req.params.id);
            await Comment.deleteMany({post:req.params.id});
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("error",err);
        return;
    }
}