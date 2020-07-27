const router = require('express').Router();
const User = require('../model/user');

router.post('/register', (req, res) => {
  res.send('Register');
  console.log('Into API /register')
  const user = new User(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  console.log(user);
});

router.post('/login');


module.exports = router;
