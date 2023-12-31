import Post from '../../../models/posts.js';
import Comment from '../../../models/comments.js';

export default {
    index : async function(req,res){
try{
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
}catch(err){
    console.log("*********error",err);
        return res.json(500,{
            message : "Internal Server Error"
        });
}

},


destroy : async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        // so there is no need to write _id
        if(post.user == req.user.id){
            await Post.findByIdAndDelete(req.params.id);
            await Comment.deleteMany({post:req.params.id});

            return res.json(200, {
                message : "Post and associated comments deleted successfully!"
            });
            
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
    }
}
}