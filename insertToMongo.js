const MongoClient = require("mongodb").MongoClient;
const mongoDBURL = require("./config").mongoDBURL;
const mongoDBName = require("./config").mongoDBName;

const insertToMongo = (subSystem, currency, data) => {
  MongoClient.connect(mongoDBURL, (err, client) => {
    if (err) throw err;

    console.log("Connected to MongoDB at: ", mongoDBURL);
    console.log("Inserting data");
    console.log("subSystem:", subSystem);
    console.log("currency:", currency);
    console.log("data length:", data.length);
    console.log("first entry:", data[0]);

    const db = client.db(mongoDBName);
    const collection = db.collection("subSystems");

    const mongoRecord = {
      date: new Date().getTime(),
      subSystem: subSystem,
      currency: currency,
      data: data
    };

    collection.insert(mongoRecord, (err, res) => {
      if (err) {
        console.error(err);
      }

      client.close();

      console.log("Inserted");

      return true;
    });
  });
};

module.exports = insertToMongo;
