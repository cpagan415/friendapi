const {Schema, model} = require('mongoose');

const User = new Schema({
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