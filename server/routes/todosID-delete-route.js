module.exports = (app, Todo, ObjectID) => {
  app.delete('/todos/:id', (req, res) => {

    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then( (todo) => {
      if(!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    }).catch( (err) => res.status(404).send());
  });
};
