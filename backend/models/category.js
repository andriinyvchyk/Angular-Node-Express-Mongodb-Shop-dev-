const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title:{type: String},
    arrayPreference:{type: Array},
    date: { type: Date, default: Date.now }
});

const Category = mongoose.model('categories', CategorySchema)

module.exports = Category;