const { body } = require("express-validator");
const { validateResult } = require("./validateResult");


exports.validateNewUserEmail = [
  body("emailTo")
    .notEmpty()
    .withMessage("No puede estar vacío")
    .isString()
    .withMessage("Tiene que ser un string")
    .isEmail()
    .withMessage("Tiene que ser un email válido")
    .escape(),
  validateResult,
];
