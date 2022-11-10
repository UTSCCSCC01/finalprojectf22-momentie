const express = require('express');
var router = express.Router();

const { postCreate, postGetByUser, postGetById, postDeleteById } = require('../controller/post/postController')

router.post('/', postCreate);
router.get('/user/:email', postGetByUser)
router.get('/id/:postId', postGetById)
router.delete('/id/:postId', postDeleteById)

export = router;