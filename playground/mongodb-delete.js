// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Can`t to connect with MongoDb');
  }

  console.log('Connection successed');

  // deleteMany
  // db.collection('Todos').deleteMany({ text: 'Eat lunch'}).then( (result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Something went wrong');
  // });;

  // deleteOne
  // db.collection('Todos').deleteOne({ text: "Eat lunch"}).then( (result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Something went wrong');
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete( {text: 'Something to do'} ).then( (result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Something went wrong');
  // });

  db.collection('Users').findOneAndDelete( {
    id : new ObjectID("58813b15fc2af401dce38261")}
  ).then( (result) => {
    console.log(result);
  }, (err) => {
    console.log('Something went wrong');
  });


  // db.close();
});
