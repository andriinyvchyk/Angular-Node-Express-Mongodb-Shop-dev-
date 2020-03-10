const mongoose = require('mongoose');

const brendsSchema = new mongoose.Schema({
    nameBrends:{type: String},
    imagesId:{type: String},
    images:{type: String},
    date: { type: Date, default: Date.now }
});

const Brends = mongoose.model('brends', brendsSchema)

module.exports = Brends;