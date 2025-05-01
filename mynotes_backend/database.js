const mongoose = require('mongoose');
const mongoDbURI = 'mongodb://0.0.0.0:27017/inotebook';

const connectWithMongo = () => {
    mongoose.connect( mongoDbURI );
}

module.exports = connectWithMongo;