const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('isomorphic-fetch');

let app = express();

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen('8000', () => {
    console.log("Listening on Port 8000.")
})