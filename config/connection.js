// Require mongoose
const mongoose = require('mongoose');

// Connect to mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetwork', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Export!!
module.exports = mongoose.connection;