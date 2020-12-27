// Imports for Node packages
var express = require("express"); // Handles routing
var app = express(); // Server for handling routes, the heart of our app
var axios = require("axios"); // Handles GET, POST etc request and responses
const bodyParser = require("body-parser"); // Middleware for dealing with form input data
app.set("view engine", "ejs");// Express server setup (boilerplate code from the docs)
app.use(        // BodyParser middleware setup (boilerplate code from the docs)
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static("public"));// Tells express where to find any static files like images

/// ** -- ROUTES -- ** ///
//user route app.get("/directory/:uid”…

app.get("/", function (req, res) {  // GET Home page which renders the index.ejs template. 
    res.render("pages/index");  // No data needed for plain HTML.
});

app.get("/add", function (req, res) {   // GET Form to add new employee
    res.render("pages/create_employee");
});

app.get("/about", function (req, res) { // GET static about page
    res.render("pages/about");
});

app.get("/delete", function (req, res) {    //get delete user page
    res.render("pages/delete_employee");
});

app.get("/update", function (req, res) {    //get update user page
    res.render("pages/update_employee");
});

app.get("/directory", function (req, res) {// GET Directory of employees, returns an array of objects from the server.
    console.log('Get directory');

    var config = {
        method: 'get',
        url: 'https://spa-lab-project-default-rtdb.firebaseio.com/data/.json',
        headers: {}
    };

    axios(config)
        .then(function (response) {
            let responseArray = Object.entries(response.data);
            console.log(responseArray);
            return responseArray;

        })
        .then((employees) => {
            res.render("pages/directory", {
                employees: employees
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});


app.post("/add", function (req, res) {// POST a new employee route
    console.log('Add employees post');
    console.log(console.log(req.body));

    var data = `{"email":"${req.body.user.email}","firstName":"${req.body.user.firstName}","id":"${req.body.user.id}","lastName":"${req.body.user.lastName}","picture":"${req.body.user.picture}","title":"${req.body.user.title}"}`;

    let config = {
        method: 'post',
        url: `https://spa-lab-project-default-rtdb.firebaseio.com/data/.json`,
        headers: {
            'Content-Type': 'text/plain'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(response.data);
            res.redirect("/directory");
        })
        .catch(function (error) {
            console.log(error);
        });
});

let uniqueID = 0;   //testing purposes
app.get("/directory/:uid", function (req, res) {    // Single Employee
    console.log('specific user (count '+uniqueID+')');
    uniqueID++; //testing purposes

    let id = req.params.uid;
    var config = {
        method: 'get',
        url: `https://spa-lab-project-default-rtdb.firebaseio.com/data/${id}.json`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            console.log("Response.data:", response.data);
            res.render("pages/person", {
                person: response.data,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.post("/delete", function (req, res) { //when delete request is made to /delete page,...
    console.log("Delete employee");
    let id = req.body.user.id;

    let config = {
        method: 'delete',
        url: `https://spa-lab-project-default-rtdb.firebaseio.com/data/${id}.json`,
        headers: { },
    };

    axios(config)
        .then(function (response) {
            console.log(response.data);
            res.redirect("/directory");
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.patch("/update", function (req, res) {
    console.log('update employees patch');
    console.log(req.body);

    var data = `{"firstName":"${req.body.user.firstName}","id":"${req.body.user.id}","title":"${req.body.user.title}"}`;

    console.log(JSON.parse(data));

    let config = {
        method: 'post',
        url: `https://spa-lab-project-default-rtdb.firebaseio.com/data/${req.body.user.id}.json`,
        headers: {
            'Content-Type': 'text/plain'
        },
        data: data
    };
    axios(config)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

});

// Express's .listen method is the final part of Express that fires up the server on the assigned port and starts "listening" for request from the app! (boilerplate code from the docs)
app.listen(2001);
console.log("Port 2001 is open");