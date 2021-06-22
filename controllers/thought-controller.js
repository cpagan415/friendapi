const { User, Thought } = require('../models/index');

const thoughtController ={
    //get all thoughts
    getThoughts(req, res)
    {
        Thought.find({})
        .then(thoughtDb => {
            res.json(thoughtDb)
        })
        .catch(err => {res.status(400).json(err)});
    },

    //create a thought

    createThought({params,body}, res){
        Thought.create(body)
        .then(({_id})=>{
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true}
            )
        })
        .then(userDbInfo =>{
            if(!userDbInfo)
            {
                res.status(404).json({message: 'No user found with this id'})
                return;
            }
            res.json(userDbInfo)
        })
        .catch(err => {res.status(400).json(err)})
    },

    //get thought by id
    getThoughtById({params}, res){
        Thought.findOne({_id: params.id})
        .then(thoughtInfo => {
            if(!thoughtInfo)
            {
                res.status(404).json({message: 'Thought with this id does not exist in the system'})
                return;
            }
            res.json(thoughtInfo)
        })
        .catch(err => {
            res.status(400).json(err);
        })
    },

    //deletes thought 
    deleteThought({params}, res)
    {
       Thought.findOneAndDelete({_id: params.thoughtId})
       .then(deletedThought => {
           if(!deletedThought)
           {
               return res.status(404).json({message: 'Thought with this is was not found in the system'});
           }
           return User.findOneAndUpdate(
               {_id: params.userId},
               {$pull: {comments: params.thoughtId}},
               {new: true}
               )
       })
       .then(userDbInfo => {
           if(!userDbInfo)
           {
               res.status(404).json({message: 'User not found with this id'})
               return;
           }
           res.json(userDbInfo);
       })
       .catch(err => res.json(err));
    }
}

module.exports = thoughtController;

