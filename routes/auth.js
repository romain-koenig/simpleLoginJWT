const router = require('express').Router();
const User = require('../model/user');

router.post('/register', (req, res) => {
res.send(`Register \\o/`)
});

router.post('/login');


module.exports = router;
