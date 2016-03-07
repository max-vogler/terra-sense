var request = require('request');
var url;
var databaseName = process.env.CLOUDANT_DB || "terra-sense-default";

if (process.env.VCAP_SERVICES) {
  // Running on Bluemix. Gets the Cloudant credentials from VCAP_SERVICES env variable
  url = JSON.parse(process.env.VCAP_SERVICES).cloudantNoSQLDB[0].credentials.url;
} else {
  // Running local
  url = process.env.CLOUDANT_URL;
}

//Create the database if it doesn't exist.
request.put(`${url}/${databaseName}`).on('error', err => { throw err });

module.exports = {
  "db": {
    "connector": "cloudant",
    "url": url,
    "database": databaseName
  }
};
