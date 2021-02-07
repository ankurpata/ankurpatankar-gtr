const httpStatus = require('http-status');
const {User} = require('../models');
const ApiError = require('../utils/ApiError');

const mongoUtil = require('../utils/mongoInit');

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryGetirRecords = async (filter, project) => {
  //Get db
  let records = [];
  try {

    const db = mongoUtil.getDb();
    records = await db
      .collection('records')
      .aggregate([{$project: project}, {$match: filter}])
      .toArray();

  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, e.message);
    console.error(e.message, "---Error @queryGetirRecords----");
  }

  return records;
}


module.exports = {
  queryGetirRecords,
};
