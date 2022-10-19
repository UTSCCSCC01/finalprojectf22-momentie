const express = require('express');
var router = express.Router();

const { retrieve_profile,
  edit_profile, likeRetri, rate_profile } = require('../controller/profile/profileController');

router.get('/', retrieve_profile)
router.patch('/', edit_profile)
router.patch('/like', rate_profile)

router.get('/like', likeRetri);

export = router;
