const router = require('express').Router();
const User = require('../model/user');

router.post('/register', async (req, res) => {
  console.log('Into API /register')
  const user = new User(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  console.log(user);

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  }
  catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login');


module.exports = router;
