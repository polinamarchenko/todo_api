const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/UdemyTodoApp', (error, db) => {
  if (error) {
    return console.log('Unable to connect to MongoDb Server')
  }
  console.log('Connected to MongoDb Server')

  // db.collection('Todos').deleteMany({text: 'Eat dinner'}).then((result) => {
  //   console.log(result)
  // });

  // db.collection('Users').deleteOne({name: 'Polina'}).then((result) => {
  //   console.log(result)
  // });

  db.collection('Users').findOneAndDelete({name: 'Polina'}).then((result) => {
    console.log(result)
  });
  // db.close();
})
