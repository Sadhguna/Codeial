import Comment from '../models/comments.js';
import Post from '../models/posts.js';
import commentsMailer from '../mailers/comments_mailer.js';
import commentEmailWorker from '../workers/comment_email_workers.js';
import queue from '../config/kue.js';
import Like from '../models/like.js';
export async function create(req,res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
        let comment = await Comment.create({
            content : req.body.content,
            post : req.body.post,
            user : req.user._id
        });
    post.comments.push(comment);
    post.save();


    comment = await comment.populate('user', 'name mail');
    commentsMailer.newComment(comment);
    if (req.xhr){
        // Similar for comments to fetch the user's id!

        return res.status(200).json({
            data: {
                comment: comment
            },
            message: "Post created!"
        });
    }


    req.flash('success', 'Comment published!');

    res.redirect('/');
}
    }catch(err){
        console.log("error in adding comment to database2",err);
    }
}

// this is using async-await

export async function destroy(req,res){
    try{
        let comment =await Comment.findById(req.params.id).populate('post','user');
   
    if(comment.user == req.user.id || comment.post.user == req.user.id){
   
        let postId = comment.post;
        await Comment.findByIdAndDelete(req.params.id);
        let post = await Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}});

        //destroy the associated likes for this comment
        await Like.deleteMany({likeable : comment._id, onModel : 'Comment'});

        if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Post deleted"
            });
        }


        req.flash('success', 'Comment deleted!');

        res.redirect('back');
    }else{
        req.flash('error', 'Unauthorized!');
        return res.redirect('back');
    }
    }catch(err){
        req.flash('error', err);
        return;
    }
}


