const router = require('express').Router();

const{getThoughts, getThoughtById, createThought, deleteThought} = require('../../controllers/thought-controller');


// /api/thoughts
router.route('/').get(getThoughts);

// /api/thoughts/thoughtId
router.route('/:id').get(getThoughtById);

// /api/thoughts/userId
router.route('/:userId').post(createThought)

// /api/thoughts/userId/thoughtId
router.route('/:userId/:thoughtId').delete(deleteThought);

module.exports = router;