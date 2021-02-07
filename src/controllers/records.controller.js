const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {recordsService} = require('../services');

/**
 * Main entry controller Fn to process request and fetch
 * records from the Getir Records Service
 * @type {function(*=, *=, *=): void}
 */
const getRecords = catchAsync(async (req, res) => {
  try {


    const {
      startDate,
      endDate,
      minCount,
      maxCount
    } = req.body;

    let selector = {};
    if (startDate) {
      selector = {
        ...selector,
        "createdAt": {
          $gte: new Date(startDate)
        }
      };
    }
    if (endDate) {
      selector = {
        ...selector,
        "createdAt": {
          ...selector["createdAt"],
          $lte: new Date(endDate)
        }
      };
    }

    if (minCount) {
      selector = {
        ...selector,
        "totalCount": {
          $gte: minCount
        }
      }
    }

    if (maxCount) {
      selector = {
        ...selector,
        "totalCount": {
          ...selector["totalCount"],
          $lte: maxCount
        }
      }
    }

    const project = {
      totalCount: {$sum: "$counts"},
      createdAt: 1,
      key: 1
    }

    const result = await recordsService.queryGetirRecords(selector, project);
    if (result)
      res.send(result);
  } catch (e) {
    // re.send({})
  }


});


module.exports = {
  getRecords
};
