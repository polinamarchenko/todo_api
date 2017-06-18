var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
})

module.exports = {User}
// var newUser = new User({
//   email: 'polina@name.com'
// });
//
// newUser.save().then((doc) => {
//   console.log('User', doc);
// }, (err) => {
//   console.log('Unable to create a user', err)
// });
