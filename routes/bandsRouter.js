const express = require("express");
const bandsController = require("../controllers/bandsController");
const autenticar = require('../controllers/autenticar');

const router = express.Router();

router.get("/", bandsController.getAllBands);
router.post("/", autenticar, bandsController.addBand);
router.delete("/:id", autenticar, bandsController.deleteBand);
router.put("/:id", autenticar, bandsController.modifyBand);
router.post("/rate/:id", autenticar, bandsController.rateBand);

module.exports = router;