const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");
const { validateNewUserEmail } = require("../middleware/validator/mailValidator"); 


/**
 * @swagger
 * tags:
 *   - name: Mails
 *     description: Operations related to mails
 */

/**
 * @swagger
 * api/sendmail:
 *   post:
 *     summary: Send a new user email
 *     tags: [Mails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MailInput'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MailResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
 
router.post('/sendmail', validateNewUserEmail , mailController.sendNewUserEmail);

module.exports = router;
