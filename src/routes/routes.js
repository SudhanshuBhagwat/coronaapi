const express = require('express');
const router = express.Router();
const {getWikiTable, getHeaders, getWorldWideStats, getTableStats, getCountries, getDataForCountry} = require('../controller');

router.get('/', (req, res) => {
    getWikiTable().then(html => {
        res.json(getWorldWideStats(html));
    });
});

router.get('/headers', (req, res) => {
    getWikiTable().then(html => {
        res.json(getHeaders(html));
    });
});

router.get('/all', (req, res) => {
    getWikiTable().then(html => {
        res.json(getTableStats(html));
    });
});

router.get('/listCountries', (req, res) => {
    getWikiTable().then(html => {
        res.json(getHeaders(html));
    });
});

router.get('/:country', (req, res) => {
    getWikiTable().then(html => {
        res.json(getDataForCountry(html, req.params.country));
    }); 
});

module.exports = router;