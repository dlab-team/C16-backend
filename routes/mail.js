const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");
const { validateNewUserEmail } = require("../middleware/validator/mailValidator"); 
// POST /api/sendmail
router.post('/sendmail', validateNewUserEmail , mailController.sendNewUserEmail);

module.exports = router;
