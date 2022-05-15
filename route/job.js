const express = require('express');
const router = express.Router();
const jobList = require('../controller/jobs');
router.get('/list' , jobList.jobPage);
module.exports = router;