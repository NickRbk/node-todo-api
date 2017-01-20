const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First text to do'
}, {
  _id: new ObjectID(),
  text: 'Second text to do'
}];

beforeEach( (done) => {
  Todo.remove({}).then( () => {
    return Todo.insertMany(todos);
  }).then( () => done() );
});

describe('POST /todos', () => {

  it('Should create a new todo', (done) => {
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

  it('Should not create a new todo', (done) => {

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
  it('Should find all todos', (done) => {
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
