const express = require('express');
var router = express.Router();

const { postCreate, postGetById } = require('../controller/post/postController')

router.post('/', postCreate);
router.get('/id/:postId', postGetById)

export = router;