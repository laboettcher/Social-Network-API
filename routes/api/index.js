// Require express
const router = require('express').Router();

// Require routes
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// Export!
module.exports = router;