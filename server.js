// Import necessary modules
const express = require("express") // Express framework for building web applications
const app = express(); // Create an Express application
const mongoose = require("mongoose") // Mongoose for MongoDB interaction
const bodyParser = require("body-parser") // Body-parser for parsing incoming request bodies
const authRoute = require("./routes/authRoute") // Import authentication routes
const checklistRoute = require("./routes/checklistRoute") // Import checklist routes
const cors = require("cors") // CORS to enable cross-origin requests
const dotenv = require("dotenv") // Dotenv for loading environment variables from a .env file
dotenv.config() // Load environment variables

// Define CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from your frontend origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE'] // Specify which HTTP methods are allowed
};

// Apply middlewares
app.use(cors(corsOptions)); // Use CORS with the specified options
app.use(bodyParser.urlencoded({extended:false})) // Parse URL-encoded bodies
app.use(bodyParser.json()) // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => {console.log("database connected")}) // Log success message
.catch(() => {console.log("database not connected");}) // Log failure message

// Define routes
app.use("/api/auth", authRoute) // Authentication routes
app.use("/api/checklist", checklistRoute) // Checklist routes

// Define the port
const PORT = process.env.PORT || 5000 // Use the environment variable or default to 5000

// Start the server
app.listen(PORT, () =>{
    console.log(`server running at ${PORT}`); // Log the running port
})
