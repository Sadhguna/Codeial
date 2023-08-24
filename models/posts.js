import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    content : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ],
    likes : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Like'
        }
    ]
},{
    timestamps : true
});

const Post = model('Post',postSchema);
export default Post;