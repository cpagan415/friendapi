const {Schema, model} = require('mongoose');

const Thought = new Schema({
    thoughtText:
    {
        type:String
    },
    createdAt:
    {

    },
    username:
    {
        type: String
    },
    reactions: []
})