//NPM imports
const express = require('express');
const bodyParser = require('body-parser');

//create and setup express app
const app = express();
app.use(bodyParser.json());

//Local constants
const port = process.env.PORT || 3000;

//Local imports
const webhook = require('./webhook');

app.get('/', (req, res) => {
    res.send("Welcome to the Webhook!");
});

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.post('/webhook', (req, res) => {
    console.log("reached webhook endpoint with a POST request");
    webhook.fulfill(req, res);
});

app.listen(port, () => {
    console.log("Listening on port", port);
});