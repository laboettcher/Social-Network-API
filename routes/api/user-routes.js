// Require express
const router = require('express').Router();

// Require user controller
const{
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller')

// Get all users and create a user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// Users by id (get, delete, and update)
router
    .route('/:id')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser)

// Friend ids (add and remove)
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

// Export!
module.exports = router;