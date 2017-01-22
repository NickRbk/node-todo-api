const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'test@gmail.com',
  password: 'secret_password',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'secret_key').toString()
  }]
}, {
  _id: userTwoId,
  email: 'test_2@gmail.com',
  password: 'secret__password',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, 'secret_key').toString()
  }]
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First text to do',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second text to do',
  completed: true,
  completedAt: 777,
  _creator: userTwoId
}];

const populateTodos = (done) => {
  Todo.remove({}).then( () => {
    return Todo.insertMany(todos);
  }).then( () => done() );
};

const populateUsers = (done) => {
  User.remove({}).then( () => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then( () => done () );
};

module.exports = {todos, populateTodos, users, populateUsers};
