const express = require('express');
const route = express.Router();
const { insertItem } = require('../db/db');

route.get('/', (req, res) => {
    res.render('create.hbs', {root:'./views'});
});
route.post('/', (req, res) => {
    let data = req.body;
    insertItem('crud', data)
    .then(() => {
        res.redirect('/');
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    });
});

module.exports = route; 
