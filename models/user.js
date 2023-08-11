const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema  = new mongoose.Schema({
    mail : {
        //unique : true,
        required : true,
        type : String
    },
    password : {
        //unique : true,
        required : true,
        type : String
    },
    // confirm_password : {
    //     type : String,
    //     required : true
    // },
    name : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    },
    friendships : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Friendship'
        }
    ]
 },{
     timestamps : true
});

let storage = multer.diskStorage({
    destination : function(req,file,cb ){
        cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename : function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now())
    }
})

//static methods
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar'); // this helps to access the form data in controller because params cant be accessed when we use multipart form
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);
module.exports = User;