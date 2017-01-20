module.exports = (app, Todo, ObjectID) => {
  app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)) {
      return res.status(404).send('Invalid ID !');
    }

    Todo.findById(id).then( (todo) => {
      if(!todo) {
        return res.status(400).send();
      }
      res.send({todo});
    }, (e) => res.status(404).send());
  });
};
