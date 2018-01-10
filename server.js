const express = require("express");
const http = require("http");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const mongoDBURL = require("./config").mongoDBURL;
const mongoDBName = require("./config").mongoDBName;

const app = express();
app.use(express.static("public"));

// Works when all files are named .ejs, but throws error when .html
app.engine("html", require("ejs").renderFile);

app.get("/api/test", (req, res) => {
  MongoClient.connect(mongoDBURL, (err, client) => {
    if (err) throw err;
    console.log("Connected to MongoDB at: ", mongoDBURL);

    const db = client.db(mongoDBName);
    const collection = db.collection("foobar");

    res.json({ test: "hello world, this is the api." });
  });
});

// Returns an array
/*
{
  symbol: "BTC",
  last_updated: 12341234,
  price_usd: 1234,
  24h_volume_usd: 1234,
  market_cap_usd: 1234,
  rank: 1
}
*/
app.get("/api/poppers", (req, res) => {
  MongoClient.connect(mongoDBURL, (err, client) => {
    if (err) throw err;

    console.log("Connected to MongoDB at: ", mongoDBURL);

    const db = client.db(mongoDBName);
    const collection = db.collection("coinmarketcap");

    collection
      .find({ symbol: "LTC" })
      .toArray()
      .then(results => {
        const outputData = results.map(d => {
          return {
            symbol: d.symbol,
            last_update: d.last_updated,
            price_usd: d.price_usd,
            volume_usd_24h: d["24h_volume_usd"],
            market_cap_usd: d.market_cap_usd,
            rank: d.rank
          };
        });

        return res.json({ results: outputData });
      });
  });
});

if (process.env.NODE_ENV === "development") {
  console.log("Node server running DEVELOPMENT");
  // Actual webpack library
  const webpack = require("webpack");
  // Middleware that will intercept requests
  const webpackDevMiddleware = require("webpack-dev-middleware");
  // Our configuration file
  const webpackConfig = require("./webpack.config.dev.js");

  // Tell express to use webpack middleware to use webpack, configured by our file.
  // Webpack middleware catches relevant requests
  const devMiddleware = webpackDevMiddleware(webpack(webpackConfig));
  app.use((this.middleware = devMiddleware));

  app.get(
    "*",
    function(req, res) {
      var index = this.middleware.fileSystem.readFileSync(
        path.join(webpackConfig.output.path, "index.html")
      );
      res.end(index);
    }.bind(this)
  );
} else if (process.env.NODE_ENV === "production") {
  console.log("Node server running PRODUCTION");

  app.use(express.static("dist"));
  app.set("views", path.join(__dirname));

  app.get("*", (req, res) => {
    res.render("./dist/index.ejs");
  });
}

const server = http.createServer(app);

// Heroku provides a port variable, so we use that if it's set.
const port = process.env.PORT || 3000;
server.listen(port);

console.log("Web server listening on:", port);
