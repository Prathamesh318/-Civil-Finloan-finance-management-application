const express = require("express");
const { createRequest, deleteRequest,updateRequest} = require("../controllers/requestController");
const router = express.Router();

router.post("/", createRequest); 
router.delete("/deleterequest", deleteRequest);
router.put('/updaterequest', updateRequest);

module.exports = router;
