const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { dbBefore, dbAfter, router: debuggerRoute } = require('./routes/debugger');  // Corrected import
const APIRouter = require('./routes/APIRouter');  // Import the main API routes
require('dotenv').config(); 

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;  // Allow dynamic port assignment (useful for deployment)

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS) for all routes

// MongoDB connection string (correct URI for MongoDB Atlas)

// const MONGODB_URI = 'mongodb://localhost:27017/ecommerce';
const MONGODB_URI = 'mongodb+srv://Maha:Maha2126@cluster0.gqpus.mongodb.net/ecommerce';

// MongoDB Connection with error handling
dbBefore("Connecting to DB...");
mongoose
    .connect(MONGODB_URI)  // Removed deprecated options
    .then(() => {
        dbAfter("DB connected successfully!");
        app.listen(PORT, function () {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Unable to connect with DB");
        console.error(error);
    });

// Routes
app.use('/api', APIRouter);  // Main API routes
app.use('/api/debugger', debuggerRoute);  // Debugger route for debugging or logging

// Example route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});
