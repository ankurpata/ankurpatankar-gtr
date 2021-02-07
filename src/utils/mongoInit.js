const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const config = require('../config/config');
const logger = require('../config/logger');

var _db;

module.exports = {
  connectToServer: function (callback) {
    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true
    };
    MongoClient.connect(process.env.MONGODB_URL, options, function (err, client) {
      if (err) {
        logger.error(`Failed to connect to the database. ${err.stack}`);
        process.exit(1);
      } else {
        logger.info('Connected to MongoDB');
        _db = client.db();
        return callback(err, _db);
      }
    });
  },

  getDb: function () {
    return _db;
  }
};
