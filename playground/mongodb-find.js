const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/UdemyTodoApp', (error, db) => {
  if (error) {
    return console.log('Unable to connect to MongoDb Server')
  }
  console.log('Connected to MongoDb Server')

  db.collection('Users').find({name: 'Polina'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
    console.log('Unable to fetch the docs', err);
  })

  // db.close();
})
