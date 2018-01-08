const config = {};

config.mongoDBURL =
  process.env.NODE_ENV === "production" ? null : "mongodb://localhost:27017";

config.mongoDBName =
  process.env.NODE_ENV === "production" ? null : "poppers_db";

module.exports = config;
