const { body } = require("express-validator");
const { validateResult } = require("./validateResult");

exports.validateNewPost = [
  body("content")
    .notEmpty()
    .withMessage("Contenido no puede estar vacío")
    .isString()
    .withMessage("Contenido debe ser un string"),
  validateResult,
];
