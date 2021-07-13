const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    console.log(firstName, lastName, email)

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = process.env.URL;
    const options = {
        method: 'POST',
        auth: "Yensss:" + process.env.AUTH
    }

    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        console.log(response.statusCode);
        response.on('data', (data) => {
            // console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();



})

app.post('/failure', (req, res) => {
    res.redirect('/');
})

app.listen(3000, () => {
    console.log("Server listening at port 3000");
})

