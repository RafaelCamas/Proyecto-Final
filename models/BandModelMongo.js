const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BandSchema = new Schema({
    name: String,
    img: String,
    genre: String,
    rating: [{
        type: Number,
        min: 0,
        max: 5
    }]
})

module.exports = mongoose.model('Band', BandSchema);