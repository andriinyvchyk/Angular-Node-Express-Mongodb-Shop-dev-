const mongoose = require('mongoose');

const goodsSchema = new mongoose.Schema({
    nameProd:{type: String},
    recomend:{type: Boolean, default: false},
    theBest:{type: Boolean, default: false},
    newer:{type: Boolean, default: false},
    categoryes:{type: String},
    nameBrend:{type: String},
    price:{type: Number},
    quantity:{type: Number},
    shortDescriptionProd:{type: String},
    fullDescriptionProd:{type: String},
    images:{type: Array},
    preferences:{type: Object},
    date: { type: Date, default: Date.now }
});

const Goods = mongoose.model('goods', goodsSchema)

module.exports = Goods;