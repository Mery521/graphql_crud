const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017/";
let dbs;
let dbName = 'db'

//mongo db
const init = () =>
MongoClient.connect(url, { useNewUrlParser: true }).then((client) => {
    dbs = client.db(dbName)
  })
const insertItem = (coll, item) => {
    const collection = dbs.collection(coll)
    return collection.insertOne(item)
}

const getItems = (coll, id = 0) => {
    const collection = dbs.collection(coll)
    if (id) {
        return collection.find({_id: ObjectId(id) }).toArray()
    }
    return collection.find({}).toArray()
}

const update = (coll, id, data) => {
    const collection = dbs.collection(coll)
    return collection.updateOne({ _id: ObjectId(id) }, { $set: data })
}

const deleteItem = (coll, id) => {
    const collection = dbs.collection(coll)
    return collection.deleteOne({ _id: ObjectId(id) });  
}

module.exports = { init, insertItem, getItems, update, deleteItem};