const express = require('express');
const cors = require('cors');

const { handler } = require('./routes/routeHandler');

const { initializeFirebaseApp } = require("./FirebaseServices/FirebaseService");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

initializeFirebaseApp();

// Any POST call is routed to handler in routeHandler.js file
app.post("*", async (req, res) => {
    console.log(req.body);
    res.send(await handler(req, "POST"));
});

// Any GET call is routed to handler in routeHandler.js file
app.get("*", async (req, res) => {
    res.send(await handler(req, "GET"));
});


app.listen(port, () => { console.log(`Server started on port ${port}!`) });