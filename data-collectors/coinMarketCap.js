var axios = require("axios");

// Stuff for Mongo
const MongoClient = require("mongodb").MongoClient;
const mongoDBURL = require("../config").mongoDBURL;
const mongoDBName = require("../config").mongoDBName;

/*
  Coin Market Cap updates their endpoints every 5 minutes according to docs
  https://coinmarketcap.com/api/

  Example response
  [{ id: 'bancor',
      name: 'Bancor',
      symbol: 'BNT',
      rank: '99',
      price_usd: '8.49838',
      price_btc: '0.00055086',
      '24h_volume_usd': '18319200.0',
      market_cap_usd: '346503349.0',
      available_supply: '40772871.0',
      total_supply: '79384422.0',
      max_supply: null,
      percent_change_1h: '-2.3',
      percent_change_24h: '4.73',
      percent_change_7d: '62.34',
      last_updated: '1515405851'
    }]
*/
axios
  .get("https://api.coinmarketcap.com/v1/ticker/?limit=1000")
  .then(function(response) {
    console.log("data", response.data);

    MongoClient.connect(mongoDBURL, (err, client) => {
      if (err) throw err;

      const db = client.db(mongoDBName);
      const collection = db.collection("coinmarketcap");

      collection.insertMany(response.data, (err, res) => {
        if (err) {
          console.error(err);
        }

        console.log("inserted");

        client.close();

        return true;
      });
    });
  });
