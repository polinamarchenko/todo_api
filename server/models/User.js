const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

//create instance methods (get called with individual documents)
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
};

UserSchema.methods.removeToken = function(token) {
  //$pull is mongodb operator let's you remove items from the array that match certain criteria / will remove the entire object from the array
  var user = this;
  return user.update({
    $pull: {
      tokens: {
        token: token
      }
    }
  });
};

//create model methods (get called with model)
UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch(e) {
    return Promise.reject();
    // return new Promise((resolve, reject) => {
    //   reject();
    // })
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

}

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          return resolve(user);
        } else {
          return reject();
        }
      });
    })
  })
}
//add mongoose middleware before the event save

UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

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
