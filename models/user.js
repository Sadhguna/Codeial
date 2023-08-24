import { Schema, model } from 'mongoose';
import multer, { diskStorage } from 'multer';
import { join } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AVATAR_PATH = join('/uploads/users/avatars');

const userSchema  = new Schema({
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
            type : Schema.Types.ObjectId,
            ref : 'Friendship'
        }
    ]
 },{
     timestamps : true
});

let storage = diskStorage({
    destination : function(req,file,cb ){
        cb(null, join(__dirname,'..',AVATAR_PATH));
    },
    filename : function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now())
    }
})

//static methods
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar'); // this helps to access the form data in controller because params cant be accessed when we use multipart form
userSchema.statics.avatarPath = AVATAR_PATH;

const User = model('User',userSchema);
export default User;