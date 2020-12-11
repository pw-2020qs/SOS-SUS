const fs = require("fs");
const fastcsv = require("fast-csv");
var MongoClient = require('mongodb').MongoClient,
  f = require('util').format,
  assert = require('assert');

const user = encodeURIComponent('sossusadmin');
const password = encodeURIComponent('rYHr9CR5pmLk!EP');
const authMechanism = 'DEFAULT';

// Connection URL
const url = f('mongodb://%s:%s@dbh11.mlab.com:27117/sossus?authMechanism=%s',
  user, password, authMechanism);

let stream = fs.createReadStream("db/data/database_cnes.csv");
let csvData = [];
let csvStream = fastcsv
  .parse({ delimiter: ';' })
  .on("data", function(data) {
    csvData.push({
      _id: data[0],
      name: data[1],
      lat: data[2],
      long: data[3],
      address: data[4],
      addressNumber: data[5],
      neighbourhood: data[6],
      apartamentNumber: data[7],
      postalCode: data[8],
      workingHoursInit: data[9],
      workingHoursEnd: data[10],
      workingHoursModel: data[11],
      deactivationReason: data[12]
    });
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    console.log(csvData);

    MongoClient.connect(
      url,
      function(err, client) {
        if (err) throw err;
        console.log("Connected correctly to server");

        console.log("Creating collection...");

        client
          .db("sossus")
          .collection("cnes")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
          });

        console.log("Finished!");

        client.close();
      }
    );
  });

stream.pipe(csvStream);
