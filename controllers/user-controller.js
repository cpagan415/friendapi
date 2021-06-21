const { User } = require('../models');

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
    getUserById(req,res){
        User.findOne({_id: params.id})
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
        User.findOneAndDelete({_id: params.id})
        .then(userInfo => {
            if(!userInfo)
            {
                res.status(404).json({ message: 'User now found in the system.'})
                return;
            }
            res.json({userInfo, message: 'User successfully deleted.'});
        })
        .catch(error => {
            res.status(400).json(error);
        })
    }
};



module.exports = userController;