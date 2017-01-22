module.exports = (app, Todo, authenticate) => {

  app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
    });

    todo.save().then( (result) => {
      res.send(result);
    }, (err) => {
      res.status(400).send(err);
    });
  });

  app.get('/todos', authenticate, (req, res) => {

    Todo.find({
      _creator: req.user._id
    }).then( (todos) => {
      res.send({todos});
    }, (err) =>{
      res.status(400).send(err);
    });
  });
};
