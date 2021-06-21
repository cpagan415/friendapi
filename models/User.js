const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username:
    {
        type: String
    },
    email:
    {
        type: String
    },
    thoughts: [],
    friends:[]
})

const User = model('User', userSchema);
module.exports = {User};