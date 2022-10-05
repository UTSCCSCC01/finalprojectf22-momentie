
var express = require('express');
var router = express.Router();
var passport = require('passport');

const { userLogin } = require('../controller/user/userController');

router.get('/', (req: any, res: any) => {
  res.status(200).send('login page')
});

router.post('/', passport.authenticate('local'), userLogin);
module.exports = router