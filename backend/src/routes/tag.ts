const express = require('express');
var router = express.Router();

// import { userTagCreate } from "../controller/tag/userTagController";
const { userTagCreate } = require('../controller/tag/userTagController')

router.post('/', userTagCreate);

export = router
