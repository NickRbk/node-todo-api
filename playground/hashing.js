const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


let password = '123456789';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

let hashedPassword = '$2a$10$rhtQx1dn7C5.PDERUjMLduOj5569/mZ.ENglJcFBZTNQcfoxL3rxm';

bcrypt.compare('password', hashedPassword, (err, res) => {
  console.log(res);
});

// let data = {
//   id: 'Hello World..'
// };
//
// let token = jwt.sign(data, 'secret_key');
// console.log(token);
//
// let decoded = jwt.verify(token, 'secret_key');
// console.log(decoded);
//
// let message = 'Hello world...2';
// let hash = SHA256(message).toString();
//
// console.log(message);
// console.log(hash);


// let message = 'I am user number 3';
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//   id: 4
// };
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// }
