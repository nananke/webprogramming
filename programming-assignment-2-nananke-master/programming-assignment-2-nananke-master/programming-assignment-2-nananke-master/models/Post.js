const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new mongoose.Schema({
    Post_Id: Number,
    title: String,
    body: String,
    author: String,
 });
 postSchema.index({'$**': 'text'});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
