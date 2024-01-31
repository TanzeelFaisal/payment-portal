const { MongoClient } = require('mongodb')

let dbConn

module.exports = {
    connectDb : (callback) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/test')
        .then((client) => {
            dbConn = client.db()
            return callback()
        })
        .catch((error) => {
            console.log(error)
            return callback(error)
        })
    },
    getDb : () => dbConn
}