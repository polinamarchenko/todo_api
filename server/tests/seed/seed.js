const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/Todo');
const {User} = require('./../../models/User');

const user1Id = new ObjectID();
const user2Id = new ObjectID();

const users = [{
  _id: user1Id,
  email: 'polina@example.com',
  password: 'user1pass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: user1Id, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
},{
  _id: user2Id,
  email: 'phil@example.com',
  password: 'user2pass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: user2Id, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo])
  }).then(() => done());
}

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: user1Id
},{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: user2Id
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
}


module.exports = {todos, populateTodos, users, populateUsers};
