const express = require('express');
const router = express.Router();

// Function to log before DB connection
function dbBefore(message) {
    console.log("Before DB Connection: " + message);
}

// Function to log after DB connection
function dbAfter(message) {
    console.log("After DB Connection: " + message);
}

// Debugging Route to check if the API is working
router.get('/debug', (req, res) => {
    res.json({ message: 'Debugger route is working!' });
});

// Export the functions to be used in other parts of the application
module.exports = { dbBefore, dbAfter, router };
