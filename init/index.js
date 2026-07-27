const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listings.js');

const MONGO_URL = 'mongodb://localhost:27017/wanderlust';

main()
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6a495fcbfba62ddefe9a8795",
    }));
    await Listing.insertMany(initData.data);
    console.log('Database initialized with sample data.');
};

initDB();