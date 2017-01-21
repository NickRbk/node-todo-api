const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://todo:todo@ds117889.mlab.com:17889/todo-node-api');

module.exports = {mongoose};
