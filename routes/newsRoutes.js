const express = require('express');
const router = express.Router();
const newsApi = require('../controllers/newsApi');

router.get('/news/:country', newsApi.getRecentNews);

module.exports = router;