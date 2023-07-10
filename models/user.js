const mongoose = require('mongoose');
const userSchema  = new mongoose.Schema({
    email : {
        unique : true,
        required : true,
        type : String
    },
    password : {
        //unique : true,
        required : true,
        type : String
    },
    name : {
        type : String,
        required : true
    }
},{
    timestamps : true
});

const User = mongoose.model('User',userSchema);
module.exports = User;