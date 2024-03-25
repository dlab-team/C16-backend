const { body } = require("express-validator");
const { validateResult } = require("./validateResult");

exports.validateNewComment = [
  body("text")
    .notEmpty()
    .withMessage("Comentario no puede estar vacío")
    .isString()
    .withMessage("Comentario debe ser un string"),
  validateResult,
];
