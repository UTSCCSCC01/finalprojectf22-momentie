const express = require('express');
var router = express.Router();

const { postCreate, postGetByUser, postGetById } = require('../controller/post/postController')

router.post('/', postCreate);
router.get('/user/:email', postGetByUser)
router.get('/id/:postId', postGetById)

export = router;