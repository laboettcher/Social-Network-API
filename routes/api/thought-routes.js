// Require express
const router = require('express').Router();

// Require thought controller
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller')

// Get all thoughts
router
    .route('/')
    .get(getAllThoughts)

// By user id (post)
router  
    .route('/:userId')
    .post(addThought)

// By thought id (get, put, and delete) 
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(addThought)
    .delete(removeThought)

// Reactions by thought id (post and delete)
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction)

// Export!
module.exports = router;  