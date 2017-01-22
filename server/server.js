require('./config/config');

const express = require('express');
const{ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT || 8080;

let app = express();

app.use(bodyParser.json());

require('./routes/todos-route')(app, Todo, authenticate);
require('./routes/users-route')(app, User, _);
require('./routes/todosID-route')(app, Todo, ObjectID, authenticate);
require('./routes/todosID-delete-route')(app, Todo, ObjectID, authenticate);
require('./routes/todosID-patch-route')(app, Todo, ObjectID, _, authenticate);

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then( (user) => {

    return user.generateAuthToken().then( (token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch( (e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
