const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); // this require helps us to setup a test mechanism on our codes
//Include this reference to the repos/circulation.js file
//Create a folder in the project called repos within it a file called circulationRepos.js
const circulationRepo = require('./repos/circulationRepos');
//Require this JSON file which is already included in the project
const data = require('./circulation.json');
const dbName = 'circulation';
const url = 'mongodb://localhost:27017';

async function main(){
 const client = new MongoClient(url);
 await client.connect(); ///stop processing until job gets done
 
 const results = await circulationRepo.loadData(data);
 assert.equal(data.length, results.insertedCount); // this code ensure we have inserted exactly the same number of records into the database
 const admin = client.db(dbName).admin();
//console.log(await admin.serverStatus());
 await client.db(dbName).dropDatabase();// this code will delete the database
 console.log(await admin.listDatabases());
 client.close(); // this would close the connection to the database
}
//Running this successfully you should see the ciruclation database created in the database server
main();