
import express from 'express';
var router = express.Router();

const { retrieve_profile,
  edit_profile } = require('../controller/profile/profileController')

router.get('/', retrieve_profile);

router.patch('/', edit_profile)

module.exports = router