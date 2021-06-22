const {Schema, model, Types} = require('mongoose');

//reaction schema
const reactionSchema = new Schema(
    {
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

});

const thoughtSchema = new Schema (
    {
    username:
    {
        type: String,
        required: true
    },
    thoughtText: 
    {
        type:String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt:
    {
        type: Date,
        default: Date.now
        //wants a getter to format the date 
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

//virtual needs to be created for reaction count 
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
