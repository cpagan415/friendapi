const router = require('express').Router();

const {
    getUsers,
    addFriend,
    getUserById,
    userCreate,
    userUpdate,
    userDelete
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getUsers).post(userCreate);

// /api/users/:id
router.route('/:id').get(getUserById).put(userUpdate).delete(userDelete);

//routes for friend list /api/users/:usersId/friends/:friendId
router.route(':userId/friends/:friendId').post(addFriend);

module.exports = router;