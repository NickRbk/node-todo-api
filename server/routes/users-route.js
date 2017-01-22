module.exports = (app, User, _) => {

  app.post('/users', (req, res) => {

    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then( () => {
      return user.generateAuthToken();
    }).then( (token) => {
      res.header('x-auth', token).send(user);
    }).catch( (err) => {
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
