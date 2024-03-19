const { body } = require("express-validator");
const { validateResult } = require("./validateResult");


exports.validateNewUserEmail = [
  body("emailTo")
    .notEmpty()
    .withMessage("Email no puede estar vacío")
    .isString()
    .withMessage("Email tiene que ser un string")
    .isEmail()
    .withMessage("Tiene que ser un email válido")
    .escape(),
  validateResult,
];
