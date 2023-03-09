// Require express
const router = require('express').Router();

// Require all routes
const apiRoutes = require('./api');

router.use('/api', apiRoutes);


router.use((req, res) => {
    res.status(404).send('Error 404');
});

// Export everything!
module.exports = router;