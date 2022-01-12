const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(() => {
        console.log('Connection failed!');
    })
}
module.exports = connectDB;