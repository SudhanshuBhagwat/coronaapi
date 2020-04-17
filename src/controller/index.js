const WorldWide = require('../models/WorldWide');
const Countries = require('../models/Countries');
const CountryList = require('../models/CountryList');
const Headers = require('../models/Headers');

const getHeaders = async () => {
    return await Headers.find({});
}

const getWorldWideStats = async () => {
    const countryExists = WorldWide.exists({ countryName: 'World' });
    if(countryExists) {
        return await WorldWide.find({ countryName: 'World' })
    }
}

const getTableStats = async () => {
    return await Countries.find({});
}

const getCountries = async () => {
    return await CountryList.find({});
}

const getDataForCountry = async (country) => {
    let result = await Countries.find({});
    let countries = result[0].countries;
    for(let i = 0; i < countries.length; i++) {
        if(countries[i].countryName == country) {
            return countries[i];
        }
    }
}

module.exports = {getHeaders, getWorldWideStats, getTableStats, getCountries, getDataForCountry}