import User from '../models/user.js';
import Friends from '../models/friendship.js';


export async function friends(req, res){
     console.log(req.params.id);
     console.log(req.user.name);
    let friend1,friend2;
    let fr1 = await Friends.findOne({from_user : req.user._id,to_user : req.params.id});
    let fr2 = await Friends.findOne({from_user : req.params.id, to_user : req.user._id});
    
    let user1 = await User.findById(req.user.id);
    let user2 = await User.findById(req.params.id);
    //console.log(friend);
    if(fr1 && fr2){       
        friend1 = await Friends.deleteOne(fr1);
        friend2 = await Friends.deleteOne(fr2);
        user1.friendships.pull(fr1); 
        user2.friendships.pull(fr2);

        user1.save();
        user2.save();
        req.flash('error', 'Removed from friends list');
    }else{
        friend1 =await Friends.create({
            from_user : req.user._id,
            to_user : req.params.id
        });   
        friend2 = await Friends.create({
            from_user : req.params.id,
            to_user : req.user._id
        })   
        user1.friendships.push(friend1);
        user2.friendships.push(friend2);
        user1.save();
        user2.save();
        req.flash('success','Added to friends list');
    }
    //console.log(fr);
    res.redirect('back');
}