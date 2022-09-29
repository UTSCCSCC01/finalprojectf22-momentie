
const express = require('express');
const router = express.Router();
const passport = require('passport');

const { userLogin } = require('../controller/user/userController');

router.get('/', (req: any, res: any) => {
  res.status(200).send('login page')
});

router.post('/', passport.authenticate('local'), userLogin);
module.exports = router