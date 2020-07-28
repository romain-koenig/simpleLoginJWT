const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validation');
const user = require('../model/user');

router.post('/register', async (req, res) => {

  //Data validation before saving.
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  //Check if user is already in database

  const emailAlreadyExists = await User.findOne({ email: req.body.email })

  if (emailAlreadyExists) {
    return res.status(400).send('email already exists');
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  console.log('Into API /register')
  const user = new User(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
  console.log(user);

  try {
    const savedUser = await user.save();
    res.send({
      message: "User created",
      user: {
        userid: user._id,
        name: user.name,
        email: user.email
      }
    });
  }
  catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  //Data validation before login.
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  //Check if user is already known

  const dbUser = await User.findOne({ email: req.body.email })

  const LOGIN_ERROR_MESSAGE = 'User email or password is wrong';
  if (!dbUser) {
    return res.status(400).send(LOGIN_ERROR_MESSAGE || 'email is not found');
  }

  //Check if password is correct

  const validPassword = await bcrypt.compare(req.body.password, dbUser.password);

  if (!validPassword) {
    return res.status(400).send(LOGIN_ERROR_MESSAGE || 'password is wrong');
  }

  //create and assign JWT token
  const token = jwt.sign({
    _id: user._id
  }, process.env.TOKEN_SECRET)

  res.header('auth-token', token).send(token);
  // return res.send(`User ${dbUser.email} logged in`);



});

module.exports = router;
