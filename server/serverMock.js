const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var today = new Date();

const initialState = [
    {
        id: 1,
        name: "Wpierdol",
        desc: "Jakiś lamus rzuca się pod prelekcyjna",
        where: "Prelekcyjna",
        when: new Date(today.getTime() - 1000000)
    },
    {
        id: 2,
        name: "Wyjebało kibel",
        desc: "wzią mopa i posprząta",
        where: "Kibek",
        when: undefined
    },
    {
        id: 3,
        name: "Zepsuty laptop",
        desc: "coś z kablem hdmi",
        where: "prelekcyjna 2",
        when: new Date(today.getTime() + 1000000)
    }
];

app.get('/get/all', function (req, res) {
    console.log("dupa");
    res.send(initialState);
});

app.listen(8000, function () {
    console.log("Listening 8000 port");
});
