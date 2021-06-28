const router = require('express').Router();

const {
    getUsers,
    addFriend,
    deleteFriend,
    getUserById,
    userCreate,
    userUpdate,
    deleteUser
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getUsers).post(userCreate);

// /api/users/:id
router.route('/:id').get(getUserById).put(userUpdate).delete(deleteUser);

//routes for friend list /api/users/:usersId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;