const express = require('express');
var router = express.Router();

const { timelineCreate } = require('../controller/timeline/timelineController')

router.post('/create', timelineCreate);

export = router