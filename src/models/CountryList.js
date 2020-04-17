const mongoose = require('mongoose');

let CountryList = mongoose.Schema({
    countries: [{
        type: String
    }]
});

module.exports = mongoose.model('CountryList', CountryList);