import Post from '../models/posts.js';
import User from '../models/user.js';

// async indicates that there are asynchronous functions inside the function
export async function home(req,res){
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
        },
        populate : {
            path : 'likes'
        }
        })
        .populate('likes');


    let users = await User.find({}).populate({ path : 'friendships', populate : { path : 'to_user'}});
    // for(let u of users){
    //     console.log(u.name);
    // }
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