const express = require('express')
const router = express.Router();
const passport = require('passport');

const { userLogin, userSignUp, userLogout, userRetriByUsername, userRetriBySkill } = require('../controller/user/userController');

function isAuthenticated(req: any, res: any, next: any) {
  if (req.user)
    return next();
  else
    return res.status(401).json({
      error: 'User not authenticated'
    })

}
router.get('/checkAuth', isAuthenticated, function (req: any, res: any) {
  res.status(200).json(req.user);
});

router.post('/login', passport.authenticate('local'), userLogin);
router.post('/signup', userSignUp);
router.post('/logout', userLogout);
router.get('/name/:username', userRetriByUsername);
router.get('/skill/search', userRetriBySkill);

export = router