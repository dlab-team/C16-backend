const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");

// POST /api/sendmail
router.post("/sendmail", mailController.sendNewUserEmail);

module.exports = router;
