const express = require("express");
const { getAllServices ,getServiceByType,calculateEMI,createServiceRequest} = require("../controllers/serviceController");
const router = express.Router();

router.get("/", getAllServices); 

router.get("/:type",getServiceByType)

router.post('/:type/calculate', calculateEMI);

router.post('/:type/form', createServiceRequest);

module.exports = router;
