const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {

  it('should create a new todo', (done) => {
    let text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect( (res) => {
        expect(res.body.text).toBe(text);
      })
      .end( (err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find({text}).then( (todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);

          done();
        }).catch( (err) => done(err));
      });
  });

  it('should not create a new todo', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end( (err, res) => {
        if(err) {
          return done(err);
        }
        Todo.find().then( (todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch( (err) => done(err));
      });
  });
});

describe('GET /todos', () => {
  it('should find all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect( (res) => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 400 if todo not found', (done) => {
    let newID = new ObjectID();
    request(app)
      .get(`/todos/${newID}`)
      .expect(400)
      .end(done);
  });

  it('should return 404 for invalid ID', (done) => {
    request(app)
      .get('/todos/somestring')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos:id', () => {
  it('should remove a todo', (done) => {
    let newID = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${newID}`)
      .expect(200)
      .expect( (res) => {
        Todo.findById(newID).then( (todo) => {
          expect(todo).toBe(null);
          expect(todo).toNotExist();
        });
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    let newID = new ObjectID();
    request(app)
      .delete(`/todos/${newID}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for invalid ID', (done) => {
    request(app)
      .delete(`/todos/1234`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    let id = todos[0]._id.toHexString();

    let text = 'Replace text';

    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should cleare timestamp if todo is not comleted', (done) => {
    let id = todos[0]._id.toHexString();

    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: false
      })
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end(done);
  });
});

describe('POST /todos', () => {

  it('should create a new todo', (done) => {
    let text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect( (res) => {
        expect(res.body.text).toBe(text);
      })
      .end( (err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find({text}).then( (todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);

          done();
        }).catch( (err) => done(err));
      });
  });

  it('should not create a new todo', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end( (err, res) => {
        if(err) {
          return done(err);
        }
        Todo.find().then( (todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch( (err) => done(err));
      });
  });
});

describe('GET /todos', () => {
  it('should find all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect( (res) => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return user if auth', (done) => {
    request(app)
      .get(`/users/me`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect( (res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not auth', (done) => {
    request(app)
      .get(`/users/me`)
      .expect(401)
      .expect( (res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    let email = 'example@email.com';
    let password = '123456789';

    request(app)
      .post(`/users`)
      .send({email, password})
      .expect(200)
      .expect( (res) => {
        expect(res.body.email).toBe(email);
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return validation errors', (done) => {
    let email = 'test@gmail.com';
    let password = '123';

    request(app)
      .post(`/users`)
      .send({email, password})
      .expect(400)
      .end(done);
  });

  it('should not create user with exist email', (done) => {
    let email = users[0].email;
    let password = '123456789';

    request(app)
      .post(`/users`)
      .send({email, password})
      .expect(400)
      .end(done);
  });
});


describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[0]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
