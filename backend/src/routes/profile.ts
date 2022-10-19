const express = require('express');
var router = express.Router();

const { retrieve_profile,
  edit_profile, rate_profile } = require('../controller/profile/profileController')

router.get('/', retrieve_profile);
router.patch('/', edit_profile)
router.get('/like', rate_profile)

export = router