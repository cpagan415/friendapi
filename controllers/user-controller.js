const { User, Thought } = require('../models/index');


//get User List
const userController = {
    getUsers(req,res)
    {
        User.find({})
        .then(userList => res.json(userList))
        .catch(error => {
            res.status(400).json(error);
        })
    },

    //get one User by ID
    getUserById({params},res){
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(oneUser => {
            if(!oneUser)
            {
                res.status(404).json({message: 'No user found on the system.'})
                return;
            }
            res.json(oneUser);
        })
        .catch(error => {
            res.status(400).json(error);
        })
    },

    //user create 
    userCreate({body}, res){
        User.create(body)
        .then(userInfo => res.json(userInfo))
        .catch(error => res.status(400).json(error))
    },

    //user update by id  
    userUpdate({params, body}, res){
        User.findOneAndUpdate({_id: params.id}, body, {new:true})
        .then(userInfo => {
            if(!userInfo)
            {
                res.status(404).json({message: 'User does not exist in the system.'})
                return;
            }
            res.json({userInfo, message: 'User sucessfully updated.'});
        })
        .catch(error => {
            res.status(400).json(error);
        })
    },
    //delete user
    userDelete({params}, res)
    {
        User.findByIdAndRemove(
            {_id: params.userId}
            )
        .then(deletedUser => {
            if(!deletedUser)
            {
                return res.status(404).json({message: 'User does not exist with that id'});
            }
            return Thought.findByIdAndDelete(
                {_id: params.userId},{_id: params.thoughtId}, {new: true})
        }) 
        .then(delDb => {
            res.json({delDb, message: 'User and thoughts successfully deleted'})
        })
        .catch(err => res.json(err));
    },

    //need to figure out how to add friend to list 
    addFriend({params} ,res)
    {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends:  params.friendId}},
            {new: true}
        )
        .then(userInfo => {
            if(!userInfo)
            {
                return res.status(404).json({message: 'User does not exist with this id'});
            }
            res.json({userInfo, message: 'New friend added.'});       
         })
         .catch(err => res.json(err));
    },

    //delete friend 
    deleteFriend({params}, res)
    {
        User.findOneAndUpdate(
           {_id: params.userId},
           {$pull: {friends: params.friendId}},
           {new: true}
        )
        .then(userFriend => {
            if(!userFriend)
            {
                res.status(404).json({message: 'User friend with that id not listed'})
                return;
            }
            res.json({userFriend, message: 'Friend successfully deleted from user'})
        })
        .catch(err => res.json(err));

    }
};



module.exports = userController;