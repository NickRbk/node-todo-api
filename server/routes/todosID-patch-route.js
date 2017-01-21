module.exports = (app, Todo, ObjectID, _) => {

  app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
      return res.status(404).send('Invalid ID !');
    }

    if(body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
      .then( (todo) => {
        if(!todo) {
          return res.send();
        }

        res.send({todo});
      })
      .catch( (e) => {
        res.status(400).send();
      });
  });
};
