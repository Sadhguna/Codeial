import Chat from '../models/chat.js';

export async function store(req,res){
    try{
        console.log(req.user.name);
        console.log(req.body);
        Chat.create({
            content : req.body.content,
            name : req.user.name,
            mail : req.user.mail
        });
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
        console.log(err);
        return res.redirect('back');
    }
}



