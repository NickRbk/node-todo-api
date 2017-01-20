module.exports = (app, User) => {

  app.post('/users', (req, res) => {
    let user = new User({
      email: req.body.text
    });

    user.save().then( (result) => {
      res.send(result);
    }, (err) => {
      res.status(400).send(err);
    });
  });

  app.get('/users', (req, res) => {

    User.find().then( (result) => {
      res.send(result);
    }, (err) =>{
      res.send('Invalid email');
    });
  });
};
