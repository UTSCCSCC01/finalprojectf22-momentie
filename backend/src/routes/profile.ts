const express = require('express');
// setup multer
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

var router = express.Router();

const { retrieve_profile, uploadImage,
  edit_profile, likeRetri, rate_profile } = require('../controller/profile/profileController');
const { timelineCreate, timelineRetri, timelineEdit } = require('../controller/timeline/timelineController')


router.get('/', retrieve_profile);
router.patch('/', edit_profile);
router.patch('/like', rate_profile);

router.post('/:email/timeline', timelineCreate);
router.get('/:email/timeline', timelineRetri);
router.patch('/:email/timeline', timelineEdit);

router.get('/like', likeRetri);

router.post('/upload', upload.single("file"), uploadImage);
export = router;
