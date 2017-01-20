// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Can`t to connect with MongoDb');
  }

  console.log('Connection successed');

  // db.collection('Todos')
  //   .findOneAndUpdate({
  //     _id: new ObjectID("588160967ad94658e51336ca")
  //   }, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   }).then( (result) => {
  //     console.log(result);
  //   });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5881465bf733241f94f9b670")
  }, {
    $set: {
      name: 'Nick'
    },
    $inc: {age: 1}
  }, {
    returnOriginal: false
  }).then( (result) => {
      console.log(result);
    });


  // db.close();
});
