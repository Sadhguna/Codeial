const Post = require('../models/posts');

module.exports.home = function(req,res){
    //return res.end('<h1> Express is up for Codeial!</h1>');
    //console.log(req.cookies);
    //res.cookie('user_id',50);
   
Post.find()
.populate('user')
.populate({
    path : 'comments',
    populate : {
        path : 'user'
    }
})
.exec().then((posts)=>{
    return res.render('home',{
        title : 'Codeial | home',
        posts : posts
    })
}).catch((err)=>{
    console.log("error in finding posts");
})

}