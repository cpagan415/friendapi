const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username:
    {
        type: String,
        unique: true,
        required: true,
        trim: true

    },
    email:
    {
        type: String,
        //https://mongoosejs.com/docs/validation.html mongoose docs for email validation and https://www.youtube.com/watch?v=nukNITdis9g
        required: true,
        unique: true,
        //valid email match, decided to use regex
        validate: [(emailVal) => {
            var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return regex.test(emailVal);
        }, 'Please enter a valid email.']

    },
    thoughts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends:[this] 
},
{
    toJSON:
    {
        virtuals: true
    },
    id: false
})

//virtual for friend count 
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports =  User;