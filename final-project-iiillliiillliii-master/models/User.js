const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    nick_name: String, 
    password: {
        type: String,
        required: true,
    },
    createdLobbies: [Number],
    profile: String,
 });
 //userSchema.index({'$**': 'text'});

const User = mongoose.model('User', userSchema);

module.exports = User;
