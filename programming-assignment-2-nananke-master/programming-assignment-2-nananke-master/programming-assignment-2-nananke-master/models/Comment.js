const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new mongoose.Schema({
    Parent_Id: Number,
    comment_Id: Number,
    comment_Title: String,
    comment_Body: String,
    comment_Author: String,
 });
commentSchema.index({'$**': 'text'});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
