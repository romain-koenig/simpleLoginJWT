const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');

const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {

  //Data validation before saving.
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  //Check if user is already in database

  const emailAlreadyExists = await User.findOne({email: req.body.email})

  if (emailAlreadyExists) {
    return res.status(400).send('email already exists');
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);  
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  console.log('Into API /register')
  const user = new User(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
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
