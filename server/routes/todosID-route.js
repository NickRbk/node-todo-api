module.exports = (app, Todo, ObjectID, authenticate) => {
  app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)) {
      return res.status(404).send('Invalid ID !');
    }

    Todo.findOne({
      _id: id,
      _creator: req.user._id
    }).then( (todo) => {
      if(!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    }).catch( (e) => {
        res.status(400).send();
    });
  });
};
