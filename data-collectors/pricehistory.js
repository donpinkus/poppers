var axios = require("axios");
var tickers = require("./tickers");
// var tickers = ["BTC", "ETH", "LTC"];

// Loop through all of our tickers, and hit our API to get their data.
tickers.forEach(ticker => {
  console.log("Getting data for ticker:", ticker);

  // We assume all tickers use "CCCAGG" exchange, whatever the fuck that means
  var url = "https://min-api.cryptocompare.com/data/histohour?fsym=" + ticker + "&tsym=USD&limit=2000&aggregate=1&e=CCCAGG";

  axios.get(url).then(function(response) {
    console.log("Got data for ticker:", ticker);
    // console.log(response.data.Data);

    // Axios returns response.data. Just so happens our API returns an object with the key "Data", so thats we gotta do response.data.Data. weird
    var priceData = response.data.Data;

    console.log("Price data length:", ticker, priceData.length);
  });
});
