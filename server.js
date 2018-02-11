//NPM imports
const express = require('express');

//create express app
const app = express();

//Local config
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Welcome to the Webhook");
});

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.post('/webhook', (req, res) => {
    res.send("reached webhook endpoint");
    console.log(JSON.stringify('request'));
});

app.listen(process.env.PORT || PORT, () => {
    console.log("Listening on port", PORT);
});