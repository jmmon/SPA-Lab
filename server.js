// Imports for Node packages
var express = require("express"); // Handles routing
var app = express(); // Server for handling routes, the heart of our app
var axios = require("axios"); // Handles GET, POST etc request and responses
const bodyParser = require("body-parser"); // Middleware for dealing with form input data

// Express server setup (boilerplate code from the docs)
app.set("view engine", "ejs");

// BodyParser middleware setup (boilerplate code from the docs)
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// Tells express where to find any static files like images
app.use(express.static("public"));

/// ** -- ROUTES -- ** ///

// GET Home page which renders the index.ejs template. No data needed for plain HTML.
app.get("/", function (req, res) {
	res.render("pages/index");
});

// POST a new employee route
app.post("/add", function (req, res) {
	// Useful for console logging the form inputs
	// console.log(console.log(req.body))
	// Example of form data for adding a new user
	// var data = `{"email":"${req.body.user.email}","firstName":"${req.body.user.firstName}","id":"${req.body.user.id}","lastName":"${req.body.user.lastName}","picture":"${req.body.user.picture}","title":"${req.body.user.title}"}`;
	// Your code goes here
});

// GET Directory of employees, returns an array of objects from the server.
app.get("/directory", function (req, res) {
	// Modify this route and the views
	res.render("pages/directory");
});

// GET static about page
app.get("/about", function (req, res) {
	res.render("pages/about");
});

// Single Employee
// "Render" the person view here!
app.get("/directory/:uid", function (req, res) {
	res.send("Render a single employee by id");
});

// GET Form to add new employee (GET the form first, then the forms "submit" button handles the POST request.

app.get("/add", function (req, res) {
	res.render("pages/create_employee");
});

// Express's .listen method is the final part of Express that fires up the server on the assigned port and starts "listening" for request from the app! (boilerplate code from the docs)

app.listen(2001);
console.log("Port 2001 is open");
