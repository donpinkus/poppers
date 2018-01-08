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

app.get("/api/poppers", (req, res) => {
  MongoClient.connect(mongoDBURL, (err, client) => {
    if (err) throw err;
    console.log("Connected to MongoDB at: ", mongoDBURL);
    const db = client.db(mongoDBName);
    const collection = db.collection("historicalData");

    collection
      .find({})
      .toArray()
      .then(results => {
        return res.json({ results: results });
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
