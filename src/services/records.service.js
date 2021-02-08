const httpStatus = require('http-status');
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
  let records = [];
  try {

    //Get db
    const db = await mongoUtil.getDb();

    //Fetch Records
    records = await db
      .collection('records')
      .aggregate([{$project: project}, {$match: filter}])
      .toArray();
  } catch (e) {
    console.log(e.message , "@queryGetirRecords@")
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
  }
  return records;
}


module.exports = {
  queryGetirRecords,
};
