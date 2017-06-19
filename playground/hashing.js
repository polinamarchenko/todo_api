const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log(decoded);



//npm install install crypto-js
//get access to hashing function
// const {SHA256} = require('crypto-js'); //not use in actual app
//
// var message = "User number 3"
// var hash = SHA256(message);
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// }
//
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'secretkey').toString()
// }
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
// // console.log(token.hash);
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'secretkey').toString();
// console.log(resultHash);
//
// if (resultHash === token.hash) {
//   console.log('Data was not change');
// } else {
//   console.log('Data was changed! Do not trust!');
// }
