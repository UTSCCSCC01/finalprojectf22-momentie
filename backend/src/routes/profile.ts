
var express = require('express');
var router = express.Router();
const { retrieve_profile } = require('../controller/profile/profileController')

router.get('/', retrieve_profile);

module.exports = router