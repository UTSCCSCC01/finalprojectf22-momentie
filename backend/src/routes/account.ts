import UserModel from '../model/userModel';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const { userLogin, userSignUp, userLogout } = require('../controller/user/userController');
// const { userLogOut } = require('../controller/user/userController');

router.get('/', (req: any, res: any) => {
  res.status(200).send('login page')
});

router.post('/login', passport.authenticate('local'), userLogin);
router.post('/signup', userSignUp);
router.get('/logout', userLogout);

module.exports = router