const mongoose = require('mongoose');
const db = mongoose.connect(`mongodb://${process.env.mdbuser}:${process.env.mdbpass}@ds211648.mlab.com:11648/corona`, 
        { useNewUrlParser: true , useUnifiedTopology: true} ,(err) => {
    if(err) throw (err);
    console.log('DB connected');
}); 

module.exports = db;