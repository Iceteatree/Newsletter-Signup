const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('isomorphic-fetch');
require('dotenv').config();
const https = require('https');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', (req, res) => {
    const name = req.body.fName;
    const surname = req.body.fSurname;
    const email = req.body.fEmail;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: name,
                    LNAME: surname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = `https://us1.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}`;

    const options = {
        method: "POST",
        auth: `alan1:${process.env.API_KEY}`
    }

    const request = https.request(url, options, (response) => {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})


app.post("/failure", (req, res) => {
    res.redirect("/")
})

app.listen('8000', () => {
    console.log("Listening on Port 8000.")
})

// process.env.API_KEY