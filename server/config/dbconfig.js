require('dotenv').config(); // Load .env file

const mongoose = require('mongoose');

// Check if MONGO_URL is defined
if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is not defined in the environment variables.");
    process.exit(1); // Exit the process if no URL is provided
}

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const connections = mongoose.connection;

connections.on('connected', () => {
    console.log('MongoDB connection successfully established');
});

connections.on('error', (err) => {
    console.log(`MongoDB connection error: ${err}`);
});

module.exports = connections;
