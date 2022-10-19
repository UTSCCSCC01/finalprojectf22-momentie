const express = require('express');
var router = express.Router();

const { userTagCreate } = require('../controller/tag/userTagController');
const { tagRetri } = require('../controller/tag/tagController');

router.post('/', userTagCreate);

router.get('/', tagRetri);

export = router
