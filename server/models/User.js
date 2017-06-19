const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 5,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} s not a valid email'
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
  }
);

//create instance methods
UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString();

  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
}

var User = mongoose.model('User', UserSchema);

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
