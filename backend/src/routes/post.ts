const express = require('express');
var router = express.Router();

const { postCreate } = require('../controller/post/postController')

router.post('/', postCreate);

export = router;