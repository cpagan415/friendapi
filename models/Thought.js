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
        default: Date.now,
        //still need getter for date format 
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


thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
