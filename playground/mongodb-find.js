// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Can`t to connect with MongoDb');
  }

  console.log('Connection successed');

  // db.collection('Todos').find({
  //   _id: new ObjectID("58813a018dc0151f00b62e3d")
  // }).toArray().then( (result) => {
  //   console.log(JSON.stringify(result, undefined, 2));
  // }, (err) => {
  //   console.log('Something went wrong', err);
  // })

  // db.collection('Todos').find().count().then( (count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Something went wrong', err);
  // })

  db.collection('Users').find({name: 'Nick'}).toArray().then( (results) => {
    console.log( JSON.stringify(results, undefined, 2) );
  }, (err) => {
    console.log('Something went wrong');
  });

  // db.close();
});
