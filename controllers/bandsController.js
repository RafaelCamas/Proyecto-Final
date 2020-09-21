const {
    response
} = require('express');
const mongoose = require('mongoose');

const Band = require('../models/BandModelMongo');
const User = require('../models/UserModelMongo');

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
            toAddBanda.img = band.img;
            toAddBanda.genre = band.genre;
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
        res.status(200).json(bandsList);
    },
    deleteBand: async function (req, res) {
        const bandId = req.params.id;
        const borrar = await Band.findByIdAndDelete(bandId);
        res.status(200).json({
            message: "Se ha eliminado la banda correctamente"
        });
    },
    modifyBand: async function (req, res) {
        const bandId = req.params.id;
        const {
            name,
            //genre,
            //year
        } = req.body;
        const dataToUpdate = {
            name,
            //genre,
            // year,
        };
        const modify = await Band.findOneAndupdate(bandId, dataToUpdate, {
            new: true
        })
        res.status(200).json({
            ...modify
        });
    },
    rateBand: async function (req, res) {
        const bandaId = req.params.id;
        const rateToAdd = req.body.rate;

        const dataToUpdate = {
            $push: {
                rating: rateToAdd
            }
        };

        const addRateResult = await Band.findByIdAndUpdate(bandaId, dataToUpdate, {
            new: true
        });
        res.status(200).json({
            ...addRateResult
        });
        rateToAdd.save((err, infoSaved) => {
            if (err) throw new Error('Error al valorar la banda')
            res.status(200).json({
                message: 'Banda valorada correctamente',
                band: infoSaved
            })
        })
    },
    matchProfile: async function (req, res) {
        const bandaName = req.params.id;
        const regexp = '/t(e)(st(\d?))/g';
    }
}