
const express = require('express');
const route = express.Router();
const { getItems } = require('../db/db');
const {root} = require('../schema/crud')

route.get('/', (req, res) => {
    root.getCrud().then((items) => {
            res.render('index.hbs', {items:items});
        });
});
module.exports = route;
