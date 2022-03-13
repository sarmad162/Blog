const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({

    content: {

        type: String,
        required: true
    },
    auther: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    created_at: {
        type: Date,
        default: Date.now
    }

});

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },
    auther: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    comments: [
        commentSchema
    ],

    created_at: {
        type: Date,
        default: Date.now
    }
});


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;