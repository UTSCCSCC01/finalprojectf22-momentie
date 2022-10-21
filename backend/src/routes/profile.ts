const express = require('express');
var router = express.Router();

const { retrieve_profile,
  edit_profile, likeRetri, rate_profile } = require('../controller/profile/profileController');
const { timelineCreate, timelineRetri } = require('../controller/timeline/timelineController')


router.get('/', retrieve_profile);
router.patch('/', edit_profile);
router.patch('/like', rate_profile);

router.post('/:email/timeline', timelineCreate);
router.get('/:email/timeline', timelineRetri);

router.get('/like', likeRetri);

export = router;
