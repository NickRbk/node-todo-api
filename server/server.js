const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());

require('./routes/todos-route')(app, Todo);
require('./routes/users-route')(app, User);

app.listen(8080, () => {
  console.log('Started on port 8080');
});

module.exports = {app};
