const mongoose = require('mongoose');

let WorldWideSchema = mongoose.Schema({
    countryName: {
        type: String
    },
    stats: [{
        type: String
    }],
    refs: [{
        type: String
    }]
});

module.exports = mongoose.model('WorldWide', WorldWideSchema);