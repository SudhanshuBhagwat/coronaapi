const mongoose = require('mongoose');

let Headers = mongoose.Schema({
    headers: [{
        type: String
    }]
});

module.exports = mongoose.model('Headers', Headers);