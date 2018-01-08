const config = {};

config.mongoDBURL =
  process.env.NODE_ENV === "production"
    ? "mongodb://<dbuser>:<dbpassword>@ds245337.mlab.com:45337/heroku_795jlplm"
    : "mongodb://localhost:27017";

config.mongoDBName =
  process.env.NODE_ENV === "production" ? "heroku_795jlplm" : "poppers_db";

module.exports = config;
