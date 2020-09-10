const express = require('express');
const bandsController = require('../controllers/bandsController');

const router = express.Router();

router.post('/newBand', bandsController.addBand);
router.get('/allBands', bandsController.getAllBands);
// router.delete('/:id', bandsController.deleteBand);
// router.put('/:id', bandsController.modifyBand);
// ruta para valorar banda?
// router.put('/:id', bandsController.rateBand);

module.exports = router;