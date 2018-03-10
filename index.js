const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err, null); //check for no errors
    console.log(`Connected correctly to the server`);

    const db = client.db('conFusion');

    dboper.insertDocument(db, {name: "Vadonut", description: "Test"}, "dishes", (result) => {
        console.log(`Insert Document:\n`, result.ops);

        dboper.findDocuments(db, "dishes", (docs) => {
            console.log(`Found Documents:\n`, docs);

            dboper.updateDocument(db, {name: "Vadonut"}, {description: "Updated Test"},
                "dishes", (result) => {
                    console.log(`Updated document:\n`, result.result);

                    dboper.findDocuments(db, "dishes", (docs) => {
                        console.log(`Found Updated Documents:\n`, docs);

                        db.dropCollection("dishes", (result) => {
                            console.log(`Dropped Collection: `, result);

                            client.close();
                        });
                    });
                });
        });
    });
});

