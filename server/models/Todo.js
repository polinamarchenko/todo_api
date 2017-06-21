var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

module.exports = {Todo}

// var newTodo = new Todo({
//   text: 'Eat dinner',
//   completed: false
// });
//
// //save return a promise
// newTodo.save().then((doc) => {
//   console.log('Saved Todo', doc)
// }, (err) => {
//   console.log('Did not save a Todo', err)
// });

// var newTodo = new Todo({
//   text: 'Watch Breaking bad',
//   completed: true,
//   completedAt: 123
// });
//
// //save return a promise
// newTodo.save().then((doc) => {
//   console.log('Saved Todo', doc)
// }, (err) => {
//   console.log('Did not save a Todo', err)
// });
