
export function getFromMongo() {
    var MongoClient = require('mongodb').MongoClient;
    
    var uri = "mongodb://mongo-admin:ZLlID1H9h2muEU7y@cluster0-shard-00-00.stryq.mongodb.net:27017,cluster0-shard-00-01.stryq.mongodb.net:27017,cluster0-shard-00-02.stryq.mongodb.net:27017/live-guide?ssl=true&replicaSet=atlas-hs200q-shard-0&authSource=admin&retryWrites=true&w=majority";
    if (MongoClient) {
        MongoClient.connect(uri, function(err, client) {
            const collection = client.db("test").collection("devices");
            // perform actions on the collection object
            client.close();
        });
        
        const data = MongoClient.query('SELECT posts...')
    }
    // res.status(200).json({ text: 'Hello' });
    return { text: 'Hello' };
}
