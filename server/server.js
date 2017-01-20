const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then( (result) => {
    res.send(result);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(8080, () => {
  console.log('Started on port 8080');
});

module.exports = {app};
