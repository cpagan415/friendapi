const {Schema, model} = require('mongoose');

const Thought = new Schema({
    thoughtText:
    {
        type:String
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    },
    username:
    {
        type: String
    },
    reactions: []
})