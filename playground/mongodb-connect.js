const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/UdemyTodoApp', (error, db) => {
  if (error) {
    return console.log('Unable to connect to MongoDb Server')
  }
  console.log('Connected to MongoDb Server')

  // db.collection('Todos').insertOne({
  //   text: 'something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err){
  //     return console.log('Unable to insert Todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // })

  db.collection('Users').insertOne({
    name: 'Polina',
    age: 31,
    location: 'San Francisco'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to add a user', err);
    }
    console.log(result.ops)
  })

  db.close();
})
