const mongoose = require('mongoose');

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
    }
 },{
     timestamps : true
});

const User = mongoose.model('User',userSchema);
module.exports = User;