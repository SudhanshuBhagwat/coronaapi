const cheerio = require('cheerio');
const fetch = require('node-fetch');
const WorldWide = require('../models/WorldWide');
const Countries = require('../models/Countries');
const CountryList = require('../models/CountryList');
const Headers = require('../models/Headers');

const wiki = 'https://en.wikipedia.org/wiki/Template:2019%E2%80%9320_coronavirus_pandemic_data#cite_note-69';

const runCron = async () => {
    const res = await fetch(wiki);
    const html =  await res.text();
    const $ = cheerio.load(html);

    //Get headers from table
    const tableHeaders = [];
    $('.covid-sticky > th').each((index, element) => {
        const tableHeader = $(element).text().replace('\n', '');
        if(tableHeader.match('\[[(a-z*)]\]')) {
            tableHeaders.push(tableHeader.slice(0, -3));
        }
    });
    tableHeaders.push('Ref.');
    const headers = new Headers({
        headers: tableHeaders
    });
    await Headers.find({}, async (err, result) => {
        if(result.length == 0) {
            await headers.save();
        }
    });

    //Get worldwide count from table
    const worldwide = [];
    $('.covid-total-row > span > b').each((index, element) => {
        if(index > 0) {
            worldwide.push($(element).text());
        }
    });
    let worldwideStats = new WorldWide({
        countryName: 'World',
        stats: worldwide,
        refs: ''
    });
    WorldWide.find({countryName: 'World'}, async (err, result) => {
        if(err) throw err;
        if(result == 0) {
            await worldwideStats.save();
        }else {
            WorldWide.updateOne({_id: result._id}, worldwideStats, (err) => {
                if(err) throw err;
            });
        }
    });

    //Get table body
    const body = [];
    $('table[class*="wikitable"] > tbody > tr:not(.sortbottom)').each((_, element) => {
        const row = []
        let name = "";
        if($(element).has('th')) {
            name = $(element).find('a').text();
            name = name.slice(0, name.indexOf('['));
        }
        const stats = []
        $(element).find('td').each((_, element) => {
            if($(element).find('sup').html() == null) {
                stats.push($(element).text().replace('\n', ''));
            }
        })
        row.push(stats)
        const links = [];
        if($(element).find('td').has('sup')) {
            const cites = [];
            $(element).find('td').find('sup').find('a').each((_, element) => {
                cites.push($(element).attr('href').replace('#', ''));
            });
            cites.forEach(cite => {
                links.push($(`li[id='${cite}']`).find('.reference-text').find('cite').find('a').attr('href'));
            });
            row.push(links);
        }
        body.push({
            'countryName': name,
            stats,
            'refs': links
        })
    });
    body.splice(0, 2);
    let allCountries = new Countries({
        countries: body
    });
    Countries.find({}, async (err, result) => {
        if(err) throw err;
        if(result == 0) {
            await allCountries.save();
        }else {
            Countries.updateOne({_id: result._id}, allCountries, (err) => {
                if(err) throw err;
            });
        }
    });

    const countries = [];
    $('table[class*="wikitable"] > tbody > tr:not(.sortbottom)').each((_, element) => {
        if($(element).has('th')) {
            const e = $(element).find('a').text();
            countries.push(e.slice(0, e.indexOf('[')));
        }
    });
    countries.splice(0, 2);
    const countryList = new CountryList({
        countries: countries
    });
    await CountryList.find({}, async (err, result) => {
        if(result.length == 0) {
            await countryList.save();
        }
    });
}

module.exports = runCron;