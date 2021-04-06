const express = require('express');
const route = express.Router();
const { deleteItem } = require('../db/db');

let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.json({ extended: false });

route.post('/', urlencodedParser, (req, res) => {
    let data = req.body;
    
    deleteItem('crud', data.id)
    .then(() => {
        res.send({response: true})
    })
    .catch((err) => {
        res.send({response: false})
    });
})

module.exports = route; 
