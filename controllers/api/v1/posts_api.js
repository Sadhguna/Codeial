const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');

module.exports.index =async function(req,res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
        path : 'comments',
        populate : {
        path : 'user'
        }
    });
    return res.json(200,{
        message : "List of posts",
        posts : posts
    })
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

            return res.json(200, {
                message : "Post and associated comments deleted successfully!"
            });
            
        //     if(req.xhr){
        //         return res.status(200).json({
        //             data : {
        //                 post_id : req.params.id
        //             },
        //             message : 'Post deleted'
        //         })
        //     }

        //     req.flash('success','Post and associated Comments deleted');
        //     return res.redirect('back');
         }
        else{
            return res.json(401 , {
                message : "You cannot delete this post!"
            });
        }
    }
    catch(err){
        console.log("*********error",err);
        return res.json(500,{
            message : "Internal Server Error"
        });
        //req.flash('error',err);
        //return res.redirect('back');
    }
}