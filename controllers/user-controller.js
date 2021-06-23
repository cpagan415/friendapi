const { User, Thought } = require('../models/index');


//get User List
const userController = {
    getUsers(req,res)
    {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
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
        User.findByIdAndRemove({_id: params.id})
        .then(userInfo => {
            if(!userInfo)
            {
                res.status(404).json({ message: 'User not found with this id.'})
                return;
            }
            //I need to figure out how to delete all thoughts assoc. with the user upon deletion of the user
        })
        .then(userInfo => res.json({userInfo, message: 'User and user thoughts deleted'}))
        .catch(error => {
            res.status(400).json(error);
        })
    },

    //need to figure out how to add friend to list 
    addFriend({params} ,res)
    {
        User.findByIdandUpdate(
            {_id: params.userId},
            {$push: {friends: params.userId}},
            {new: true}
        )
        .then(userInfo => {
            if(!userInfo)
            {
                return res.status(404).json({message: 'User does not exist with this id'});
            }
            res.json(userInfo);       
         })
         .catch(err => res.json(err));
    }
};



module.exports = userController;