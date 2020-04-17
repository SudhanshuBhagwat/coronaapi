const express = require('express');
const router = express.Router();
const {getHeaders, getWorldWideStats, getTableStats, getCountries, getDataForCountry} = require('../controller');

/**
 * @api {get} /corona/ Request WorldWide stats
 * @apiName Get WorldWide Stats
 * @apiGroup Corona
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "countryName": "world",
 *          "stats": [
 *              "2,006,513",
 *              "128,886",
 *              "501,758"
 *          ]
 *      }
 */
router.get('/', (req, res) => {
    getWorldWideStats().then(result => {
        res.json(result);
    })
});

/**
 * @api {get} /corona/ Request State Headers
 * @apiName Get Headers
 * @apiGroup Corona
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          "Countries and territories",
 *          "Cases",
 *          "Deaths",
 *          "Recov.",
 *          "Ref."
 *      ]
 */
router.get('/headers', (req, res) => {
    getHeaders().then(result => {
        res.json(result[0]);
    })
});

/**
 * @api {get} /corona/ Request All Countries Stats
 * @apiName Get Countries Stats
 * @apiGroup Corona
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {
 *              "countryName": "United States",
 *              "stats": [
 *                  "615,215",
 *                  "26,211",
 *                  "49,970"
 *              ],
 *              "refs.": [
 *                  "https://coronavirus.1point3acres.com/en"
 *              ]
 *          }
 *      ]
 */
router.get('/all', (req, res) => {
    getTableStats().then(result => {
        res.json(result);
    })
});

/**
 * @api {get} /corona/ Request List of Countries for Available Data
 * @apiName Get List of Countries
 * @apiGroup Corona
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          "United States",
 *          "Spain",
 *          "Italy",
 *          "India",
 *          "China",
 *          ...
 *      ]
 */
router.get('/countries', (req, res) => {
    getCountries().then(result => {
        res.json(result[0]);
    });
});

/**
 * @api {get} /corona/:CountryName Request Stats for Country
 * @apiParam {String} CountryName="India"
 * @apiName Get Country Stats
 * @apiGroup Corona
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "countryName": "India",
 *          "stats": [
 *              "11,933",
 *              "392",
 *              "1,344"
 *          ]
 *      }
 */
router.get('/:country', (req, res) => {
    getDataForCountry(req.params.country).then(result => {
        res.json(result);
    });
});

module.exports = router;