const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/TodoApp');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://todoapi:todoapi@ds117849.mlab.com:17849/todo-app-api');

module.exports = {mongoose};
