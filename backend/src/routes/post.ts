const express = require('express');
var router = express.Router();

const { postCreate, postGetByUser } = require('../controller/post/postController')

router.post('/', postCreate);
router.get('/user/:email', postGetByUser)

export = router;