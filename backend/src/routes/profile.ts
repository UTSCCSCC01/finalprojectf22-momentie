const express = require('express');
var router = express.Router();

const { retrieve_profile,
  edit_profile } = require('../controller/profile/profileController');

const { timelineRetri } = require('../controller/timeline/timelineController');

router.get('/', retrieve_profile);

router.patch('/', edit_profile);

router.get('/:email/timeline/', timelineRetri);

export = router;
