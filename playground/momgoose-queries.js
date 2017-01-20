const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5882620f84e8582a249cfccf';
let id_user = '588271306b026b2d7c138a33';

if(!ObjectID.isValid(id)) {
  console.log('Invalid ID');
}
// Todo.find({
//   _id: id
// }).then( (todos) => {
//   console.log("Todos", todos);
// });
//
// Todo.findOne({
//   completed: false
// }).then( (todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then( (todo) => {
//   if(!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by id', todo);
// }).catch( (e) => console.log(e) );


User.findById(id_user).then( (user) => {
  if(!user) {
    return console.log('User not found');
  }
  console.log(`Hi, ${user.email}!`);
}).catch( (e) => console.log(e) );
