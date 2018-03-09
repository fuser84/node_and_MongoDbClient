const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err, null); //check for no errors
    console.log(`Connected correctly to the server`);

    const db = client.db('conFusion');

    const collection = db.collection("dishes");
    collection.insertOne({"name": "Uthappizza", "description":"test"},
        (err, result) => {
            assert.equal(err, null); //check for no errors
            console.log(`After Insert:\n`);

            //show how many operation has been performed
            console.log(result.ops);

            collection.find({}).toArray((err, docs) => {
                assert.equal(err, null); //check for no errors
                console.log(`Found:\n`);
                console.log(docs);

                db.dropCollection("dishes", (err, result) => {
                    assert.equal(err, null); //check for no errors
                    client.close();
                });
            });
        });
});


