const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function(req,res){
    Post.findById(req.body.post).then((post)=>{
        Comment.create({
            content : req.body.content,
            post : req.body.post,
            user : req.user._id
        }).then((comment)=>{
            //console.log("hooo");
            post.comments.push(comment);
            post.save();
            
        }).catch((err)=>{
            console.log("error in adding comment to database1",err);
        })
        res.redirect('/');
    }).catch((err)=>{
        console.log("error in adding comment to database2",err);
    });
}