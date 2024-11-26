const express = require("express");
const { createMember, deleteMember ,updatePassword} = require("../controllers/memberController");
const router = express.Router();

router.post("/", createMember);
router.delete("/cancelmember", deleteMember);
router.put('/updatepassword', updatePassword);

module.exports = router;
