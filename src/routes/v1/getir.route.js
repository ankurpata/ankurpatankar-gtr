const express = require('express');
const recordsController = require('../../controllers/records.controller');

const router = express.Router();

router
  .route('/getRecords')
  .post(recordsController.getRecords)

module.exports = router;
