const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const userSchema = require('../models/user');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.post('/register', (request, response) => {

  let newUser = new userSchema({
    Email: request.body.email,
    Username: request.body.username,
    Password: userSchema.hashPassword(request.body.password),
    Creation_date: Date.now()
  });

  newUser.save().then((userData => {
    response.status(201).send(userData);
  })).catch((error) => {
    response.status(501).send(error, { message: 'Error registering user' });
  });

});


router.post('/login', (request, response) => {
  userSchema.findOne({ Email: request.body.email }).then(account => {

    if(account){
      if(account.isValid(request.body.password)){

        // console.log(account)

        // generate token
        // passing the username to use it when decoding the token
        let token = jwt.sign({ Username: account.Username }, 'secretkey', { expiresIn: '3h'});
        response.status(200).json(token);


      } else {
        response.send({ message: 'Invalid Credentials' });
      }
    }
    else {
      response.send({ message: 'Email is not Registered' });
    }

  }).catch( error => {
    response.send(error, { message: 'Some Internal Error' });
  });
});


// Vertify the token
// console.log('first console' + decodedToken);

router.get('/username', vertifyToken, (request, response) => {
  return response.status(200).json(decodedToken.Username);
});

let decodedToken = '';

function vertifyToken(request, response, next){
  let token = request.query.token;


  jwt.verify(token, 'secretkey', (error, tokenData) => {
    if(error) {
      return response.status(400).json({ message: 'Unauthorized Request' });
    }

    if(tokenData) {
      decodedToken = tokenData;
      next();
    }
  });
}



module.exports = router;
