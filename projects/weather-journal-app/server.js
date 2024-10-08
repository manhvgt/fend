// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

// Middleware
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const hostname = 'localhost';
const port = 8000;
const server = app.listen(port, listening);

// Function
function listening() {
    console.log(`Server running at ${hostname}:${port}`);
}

// Callback function to complete GET '/weather'
function getWeatherData(req, res) {
    res.send(projectData);
}

// Callback function to complete POST '/weather'
function postWeatherData(req, res) {
    projectData = req.body;
    console.log("Weather data has been saved.");
    console.log(projectData);
    // Save data for further data process on BE side
}

// GET route
app.get('/weather', getWeatherData);

// POST route
app.post('/weather', postWeatherData);
