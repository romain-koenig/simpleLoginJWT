const router = require('express').Router();
const verify = require('./privateRoutes');
router.get('/', verify, (req, res) => {
  return res.json({
    posts: {
      title: "Post 01",
      description: "This post should only be available when logged in"
    }
  })
});

module.exports = router;