const Mongoose = require('mongoose');

const db = async () => {
    try {
        await Mongoose.connect("mongodb://127.0.0.1:27017", {
            dbName: "backend"
        })
        console.log('DB Connected');
    } catch (error) {
        console.log('DB Connection Error');
    }
}

module.exports = { db }