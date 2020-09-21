const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: Number,
    name: String,
    correo: String,
    telefono: Number,
    fotoPerfil: String,
    userName: String,
    password: String,
    likedBands: [{
        type: Schema.Types.ObjectId,
        ref: 'Band'
    }]
});

module.exports = mongoose.model('User', UserSchema);