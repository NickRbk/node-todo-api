require('./config/config');

const express = require('express');
const{ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const port = process.env.PORT || 8080;

let app = express();

app.use(bodyParser.json());

require('./routes/todos-route')(app, Todo);
require('./routes/users-route')(app, User, _);
require('./routes/todosID-route')(app, Todo, ObjectID);
require('./routes/todosID-delete-route')(app, Todo, ObjectID);
require('./routes/todosID-patch-route')(app, Todo, ObjectID, _);


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
