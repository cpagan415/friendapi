const router = require('express').Router();

const {
    getUsers,
    getUserById,
    userCreate,
    userUpdate,
    userDelete
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getUsers).post(userCreate);

// /api/users/:id
router.route('/:id').get(getUserById).put(userUpdate).delete(userDelete);

module.exports = router;