import mongoose from 'mongoose';


const passwordResetSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    token : {
        type : String,
    },
    valid : {
        type : Boolean,
        default : true
    }
},{
    timestamps : true
});
const passwordReset = mongoose.model("passwordSchema",passwordResetSchema);
export default passwordReset;