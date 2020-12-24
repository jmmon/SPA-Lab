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


//user route app.get("/directory/:uid”…


// Tells express where to find any static files like images
app.use(express.static("public"));

/// ** -- ROUTES -- ** ///

// GET Home page which renders the index.ejs template. No data needed for plain HTML.
app.get("/", function (req, res) {
    res.render("pages/index");
});


app.get("/add", function (req, res) {
    res.render("pages/create_employee");
});
// POST a new employee route
app.post("/add", function (req, res) {
    console.log('Add employees post');
    // Useful for console logging the form inputs
    console.log(console.log(req.body));
    // Example of form data for adding a new user
    var data = `{"email":"${req.body.user.email}","firstName":"${req.body.user.firstName}","id":"${req.body.user.id}","lastName":"${req.body.user.lastName}","picture":"${req.body.user.picture}","title":"${req.body.user.title}"}`;
    // Your code goes here


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

// GET Directory of employees, returns an array of objects from the server.
app.get("/directory", function (req, res) {
    console.log('Get directory');

    var config = {
        method: 'get',
        url: 'https://spa-lab-project-default-rtdb.firebaseio.com/data/.json',
        headers: {}
    };

    axios(config)
        .then(function (response) {
            //console.log(response.data);
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


    // Modify this route and the views
});

// GET static about page
app.get("/about", function (req, res) {
    res.render("pages/about");
});
let uniqueID = 0;
// Single Employee
// "Render" the person view here!
app.get("/directory/:uid", function (req, res) {
    console.log('specific user (count '+uniqueID+')');
    uniqueID++;
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

// GET Form to add new employee (GET the form first, then the forms "submit" button handles the POST request.

app.get("/delete", function (req, res) {
    res.render("pages/delete_employee");
});

app.delete("/delete", function (req, res) {
    console.log("Delete employee");
    let id = req.body.user.id;

    let config = {
        method: 'delete',
        url: `https://spa-lab-project-default-rtdb.firebaseio.com/data/${id}.json`,
        headers: { },
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.redirect("/directory");
        })
        .catch(function (error) {
            console.log(error);
        });

});


app.patch("/update", function (req, res) {
    console.log('update employees patch');
    // Useful for console logging the form inputs
    console.log(console.log(req.body));
    // Example of form data for adding a new user
    var data = `{"firstName":"${req.body.user.firstName}","id":"${req.body.user.id}","title":"${req.body.user.title}"}`;
    // Your code goes here

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
app.get("/update", function (req, res) {
    res.render("pages/update_employee");
});

// Express's .listen method is the final part of Express that fires up the server on the assigned port and starts "listening" for request from the app! (boilerplate code from the docs)

app.listen(2001);
console.log("Port 2001 is open");