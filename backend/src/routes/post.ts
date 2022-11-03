const express = require('express');
var router = express.Router();

const { postCreate, postRetriByUser } = require('../controller/post/postController')

router.post('/', postCreate);
router.get('/', postRetriByUser)

export = router;