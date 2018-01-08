var axios = require("axios");
var tickers = require("./tickers");

// Stuff for Mongo
const MongoClient = require("mongodb").MongoClient;
const mongoDBURL = require("../config").mongoDBURL;
const mongoDBName = require("../config").mongoDBName;

// Data from: https://www.cryptocompare.com/api/#-api-data-coinsnapshot-
// Loop through all of our tickers, and hit our API to get their data.
tickers.forEach(ticker => {
  // We assume all tickers use "CCCAGG" exchange, whatever the fuck that means
  var url =
    "https://min-api.cryptocompare.com/data/histohour?fsym=" +
    ticker +
    "&tsym=USD&limit=2000&aggregate=1&e=CCCAGG";

  axios
    .get(url)
    .then(function(response) {
      console.log("Got data for ticker:", ticker);
      // console.log(response.data.Data);

      // Axios returns response.data. Just so happens our API returns an object with the key "Data", so thats we gotta do response.data.Data. weird
      var priceData = response.data.Data;

      console.log("Price data length:", ticker, priceData.length);

      MongoClient.connect(mongoDBURL, (err, client) => {
        if (err) throw err;

        const db = client.db(mongoDBName);
        const collection = db.collection("historicalData");
        const mongoRecord = {
          ticker: ticker,
          data: priceData
        };

        collection.insert(mongoRecord, (err, res) => {
          if (err) {
            console.error(err);
          }

          client.close();

          return true;
        });
      });
    })
    .catch(err => {
      console.error("Error", err);
    });
});
