import mongoose from 'mongoose';


const chatSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    //comment belongs to a user
    name : {
        type : String,
        required : true
    },
    mail : {
        type : String,
        required : true
    }
},{
    timestamps : true
});
const Chat = mongoose.model("Chat",chatSchema);
export default Chat;