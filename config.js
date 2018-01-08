const config = {};

config.mongoDBURL =
  process.env.NODE_ENV === "development" ? "mongodb://localhost:27017" : null;

config.mongoDBName =
  process.env.NODE_ENV === "development" ? "poppersDB" : null;

module.exports = config;
