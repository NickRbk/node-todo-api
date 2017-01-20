module.exports = (app, Todo) => {

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

  app.get('/todos', (req, res) => {

    Todo.find().then( (result) => {
      res.send(result);
    }, (err) =>{
      res.send('Unable to find todos');
    });
  });
};
