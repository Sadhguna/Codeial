const Comment = require('../models/comments');
const Post = require('../models/posts');

// module.exports.create = async function(req,res){
//     Post.findById(req.body.post).then((post)=>{
//         Comment.create({
//             content : req.body.content,
//             post : req.body.post,
//             user : req.user._id
//         }).then((comment)=>{
//             //console.log("hooo");
//             post.comments.push(comment);
//             post.save();
            
//         }).catch((err)=>{
//             console.log("error in adding comment to database1",err);
//         })
//         res.redirect('/');
//     }).catch((err)=>{
//         console.log("error in adding comment to database2",err);
//     });
// }
module.exports.create = async function(req,res){
    try{
        let post =await Post.findById(req.body.post);
        let comment = await Comment.create({
            content : req.body.content,
            post : req.body.post,
            user : req.user._id
        });
    post.comments.push(comment);
    post.save();
    res.redirect('/');
    }catch(err){
        console.log("error in adding comment to database2",err);
    }
}

// this is using async-await

module.exports.destroy = async function(req,res){
    try{
        let comment =await Comment.findById(req.params.id);
    if(comment.user = req.user.id){
        let postId = comment.post;
        await Comment.findByIdAndDelete(req.params.id);
        await Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}});
        res.redirect('back');
    }else{
        return res.redirect('back');
    }
    }catch(err){
        console.log('Error',err);
    }
}

//this is using then-catch

// module.exports.destroy = function(req,res){
//     Comment.findById(req.params.id).then((comment)=>{
//         if(comment.user = req.user.id){
//             let postId = comment.post;
//             Comment.findByIdAndDelete(req.params.id).then().catch((err)=>{
//                 console.log("cannot find the comment",err);
//             });
//             Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}}).then(()=>{
//                 return res.redirect('back');
//             }).catch((err)=>{
//                 console.log("cannot able to find the comment in post module",err);
//             });
//             res.redirect('back');
//         }else{
//             return res.redirect('back');
//         }
//     });
// }
