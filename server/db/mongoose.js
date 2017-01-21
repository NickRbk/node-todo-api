const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

// mongoose.connect(process.env.MONGODB_URI || 'Your path to mongodb');

module.exports = {mongoose};
