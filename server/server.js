require('./config/config');
//library imports
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
//local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');
var {authenticate} = require('./middleware/authenticate');

var app = express();

var port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.status(200).send({todos})
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      res.status(404).send()
    }
    res.status(200).send({todo})
  }, (err) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      res.status(404).send()
    }
    res.status(200).send({todo})
  }, (err) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo})
  }).catch((err) => {
    res.status(400).send();
  })
})

//USERS
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((err) => {
    res.status(400).send();
  });
});


app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Application started. Listening on port: ${port}`);
})


module.exports = {app};
