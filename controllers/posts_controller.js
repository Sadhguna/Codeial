//const { content } = require('har-validator');
const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = function(req,res){
    Post.create({
        content : req.body.content,
        user : req.user._id
    });
    return res.redirect('back');
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id).then((post)=>{
        // .id means converting the object id into string
        // so there is no need to write _id
        if(post.user == req.user.id){
            //let id = req.params.id;
            Post.findByIdAndDelete(req.params.id).then().catch();
            Comment.deleteMany({post:req.params.id}).then().catch((err)=>{
                console.log("error in deleting post1",err);
                return res.redirect('back');
            });
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }).catch((err)=>{
        console.log("could not able to find the post",err);
    })
}