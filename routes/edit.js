const express = require('express');
const route = express.Router();
const { getItems, update} = require('../db/db');
let id;

route.get('/', (req, res) => {
    id = getUrlParam(req, 'id')
    getItems('crud', id).then((item) => {
        res.render('edit.hbs', {item: item[0]});
    });
});

route.post('/', (req, res) => {
    let data = req.body;
    update('crud', id, data)
    .then(() => {
        res.redirect('/');
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    });
});

function getUrlParam(req, param) {
    let current_url = req.protocol + "://" + req.get('host') + req.originalUrl;
    let url_params = new URL(current_url);
    return url_params.searchParams.get(param);
}

module.exports = route; 