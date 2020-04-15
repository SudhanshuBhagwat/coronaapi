const cheerio = require('cheerio');
const fetch = require('node-fetch');

const wiki = 'https://en.wikipedia.org/wiki/Template:2019%E2%80%9320_coronavirus_pandemic_data#cite_note-69';

const getWikiTable = async () => {
    const res = await fetch(wiki);
    const html =  await res.text();

    return html;
}

const getHeaders = (html) => {
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
    return tableHeaders;
}

const getWorldWideStats = (html) => {
    const $ = cheerio.load(html);

    //Get worldwide count from table
    const worldwide = [];
    $('.covid-total-row > span > b').each((index, element) => {
        if(index > 0) {
            worldwide.push($(element).text());
        }
    });
    return {
        'countryName': 'world',
        'stats': worldwide
    };
}

const getTableStats = (html) => {
    const $ = cheerio.load(html);

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
            'refs.': links
        })
    });
    body.splice(0, 2);

    return body;
}

const getCountries = (html) => {
    const $ = cheerio.load(html);
    const countries = [];
    $('table[class*="wikitable"] > tbody > tr:not(.sortbottom)').each((_, element) => {
        if($(element).has('th')) {
            const e = $(element).find('a').text();
            countries.push(e.slice(0, e.indexOf('[')));
        }
    });
    countries.splice(0, 2);

    return countries;
}

const getDataForCountry = (html, country) => {
    const $ = cheerio.load(html);
    const data = [];
    $('table[class*="wikitable"] > tbody > tr:not(.sortbottom)').each((_, element) => {
        if($(element).has('th')) {
            const e = $(element).find('a').text();
            if(e.includes(country)) {
                $(element).find('td').each((_, element) => {
                    if($(element).find('sup').html() == null) {
                        data.push($(element).text().replace('\n', ''));
                    }
                })
            }
        }
    });

    return {
        'countryName': country,
        'stats': data
    };
}

module.exports = {getWikiTable, getHeaders, getWorldWideStats, getTableStats, getCountries, getDataForCountry}