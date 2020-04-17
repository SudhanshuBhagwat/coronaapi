const mongoose = require('mongoose');

let CountriesSchema = mongoose.Schema({
    countries: [{
        countryName: {
            type: String
        },
        stats: [{
            type: String
        }],
        refs: [{
            type: String
        }]
    }]
});

module.exports = mongoose.model('Countries', CountriesSchema);