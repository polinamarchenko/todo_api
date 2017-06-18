const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.findByIdAndRemove('5946fd727266ff13910f2cf5').then((todo) => {
//   console.log(todo);
// })

Todo.findOneAndRemove({_id: '5947000f8e2cd822c816b2cf'}).then((todo) => {
  console.log(todo);
})
