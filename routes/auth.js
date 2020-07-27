const router = require('express').Router();
const User = require('../model/user');

const validation = require('../validation');

router.post('/register', async (req, res) => {

  //Data validation before saving.
  const { error } = validation.registerValidation(req.body);
  
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

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
