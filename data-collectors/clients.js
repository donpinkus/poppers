// Eth clients are scraped in nodesAndEthClients, since it requires paging through requests.

let axios = require("axios");
const insertToMongo = require("../insertToMongo");

const getBitcoinClientData = () => {
  let snapshotURL = "https://bitnodes.earn.com/api/v1/snapshots/latest/";

  axios
    .get(snapshotURL)
    .then(resp => {
      let nodes = resp.data.nodes;
      let clients = {};

      for (let node in nodes) {
        let clientType = nodes[node][1];

        if (clientType in clients) {
          clients[clientType] += 1;
        } else {
          clients[clientType] = 1;
        }
      }

      let data = [];

      for (let client in clients) {
        data.push({ client: client, count: clients[client] });
      }

      insertToMongo("clients", "bitcoin", data);

      return true;
    })
    .catch(err => {
      console.error(err);
      return err;
    });
};

const runAll = () => {
  getBitcoinClientData();
  // Eth clients are scraped in nodesAndEthClients, since it requires paging through requests.
};

module.exports = runAll;
