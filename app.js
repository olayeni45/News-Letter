const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();

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

    const url = "https://us6.api.mailchimp.com/3.0/lists/6cb36df0b3";
    const options = {
        method: 'POST',
        auth: "Yenss:46d6c4cb22ffa8a72aaf9364e946d610-us6"
    }

    const request = https.request(url, options, (response) => {
        response.on('data', (data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();


    res.send("POST SUCCESSFUL")
})


app.listen(3000, () => {
    console.log("Server listening at port 3000");
})


//46d6c4cb22ffa8a72aaf9364e946d610-us6
// 46d6c4cb22ffa8a72aaf9364e946d610 - us6
//6cb36df0b3