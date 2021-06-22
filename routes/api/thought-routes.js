const router = require('express').Router();

const{
    getThoughts, 
    getThoughtById, 
    createThought, 
    deleteThought,
    addReaction,
    deleteReaction} = require('../../controllers/thought-controller');


// /api/thoughts
router.route('/').get(getThoughts);

// /api/thoughts/thoughtId
router.route('/:id').get(getThoughtById);

// /api/thoughts/userId
router.route('/:userId').post(createThought)

// /api/thoughts/userId/thoughtId
router.route('/:userId/:thoughtId').delete(deleteThought);

// /api/thoughts/thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;