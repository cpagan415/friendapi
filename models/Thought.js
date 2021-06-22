const {Schema, model, Types} = require('mongoose');

//reaction schema
const reactionSchema = ({
    reactionId:
    {
        type:Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody:
    {
        type: String,
        required: true,
        maxlength: 280
    },
    username:
    {
        type: String,
        required: true
    },
    createdAt:
    {
        type: Date,
        default: Date.now
        //need to format a timestamp for the getter get: createdAtVal => doteFormat(createdAtVal)
    }

})

const thoughtSchema = ({
    username:
    {
        type: String
    },
    thoughtText: 
    {
        type:String
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    },
    reactions: [reactionSchema]
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;