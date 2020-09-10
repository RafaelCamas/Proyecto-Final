const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BandsSchema = new Schema({
    name: String,
    genre: String,
    year: Number,
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
})

module.exports = mongoose.model('Bands', BandsSchema);