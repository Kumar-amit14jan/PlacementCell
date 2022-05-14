const express = require('express');
const router = express.Router();
const resultPage = require('../controller/result');
router.get('/:id' , resultPage.resultPage);
router.post('/update', resultPage.update)
module.exports = router;