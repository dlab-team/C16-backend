const { body } = require("express-validator");
const { validateResult } = require("./validateResult");

exports.validateNewMaterial = [
  body("title")
    .notEmpty()
    .withMessage("Título no puede estar vacío")
    .isString()
    .withMessage("Título debe ser un string"),
  body("content")
    .notEmpty()
    .withMessage("Contenido no puede estar vacío")
    .isString()
    .withMessage("Contenido debe ser un string"),
  validateResult,
];
