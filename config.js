const config = {};

config.mongoDBURL =
  process.env.NODE_ENV === "production"
    ? "mongodb://heroku_g4dqcfd2:j9kkdnnm2cjgvgslrf90kpofrc@ds245337.mlab.com:45337/heroku_g4dqcfd2"
    : "mongodb://localhost:27017";

config.mongoDBName =
  process.env.NODE_ENV === "production" ? "heroku_g4dqcfd2" : "poppers_db";

module.exports = config;
