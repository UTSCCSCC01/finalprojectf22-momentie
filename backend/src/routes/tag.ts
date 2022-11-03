const express = require('express');
var router = express.Router();

const { userTagCreate, userTagDelete } = require('../controller/tag/userTagController');
const { tagRetri, popularTags } = require('../controller/tag/tagController');

router.post('/', userTagCreate);
router.delete('/', userTagDelete)
router.get('/', tagRetri);
router.get('/top', popularTags)

export = router
