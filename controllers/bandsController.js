const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Band = require('../models/bandsModelMongo')

mongoose.connect(`mongodb+srv://${process.env.MONGOATLAS_USER}:${process.env.MONGOATLAS_PASS}@servidor1.qpyev.azure.mongodb.net/bands?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {
    addBand: async function (req, res) {
        try {
            const band = req.body;
            const toAddBanda = new Band();
            toAddBanda.name = band.name;
            toAddBanda.genre = band.genre;
            toAddBanda.year = band.year;
            toAddBanda.save((err, bandSaved) => {
                if (err) throw new Error('Ocurrió un error al añadir la banda', err)
                res.status(200).json({
                    message: 'Banda añadida correctamente',
                    band: bandSaved
                })
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Se ha producido un error al añadir banda');
        }
    },
    getAllBands: async function (req, res) {
        const bandsList = await Band.find();
        res.status(200).json({
            ...bandsList
        });
    },
    deleteBand: async function (req, res) {
        const bandId = req.params.id;
        const borrar = await Band.deleteOne(bandId)
        res.status(200).json({
            ...borrar
        });
    },
    modifyBand: async function (req, res) {
        const bandId = req.params.id;
        const modify = await Band.findOneAndupdate(bandId)
        res.status(200).json({
            ...modify
        });
    },
    rateBand: async function (req, res) {
        const bandaId = req.params.id;
        const rate = await Band. //findOneAndUpdate? updateOne?
        res.status(200).json({
            ...rate
        });
    }
}