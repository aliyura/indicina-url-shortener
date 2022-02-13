const mongoose = require('mongoose');

function MongoClient() {
    this.options = {
        useUnifiedTopology: true,
        useNewUrlParser: true
    };
}
MongoClient.prototype.initialize = function () {
    log.green('Connecting Database....')
    mongoose
        .connect(process.env.MONGO_DB_URL, this.options)
        .then(()=>{
             log.yellow('Database connected')
        })
        .catch((error) => {
             log.red('Unable to connect to Database...')
            throw error;
        });
};

module.exports = new MongoClient();
