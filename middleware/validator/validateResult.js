const { validationResult } = require('express-validator');

exports.validateResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = errors.array().map(({ msg }) => ({ msg }));
    return res.status(400).json(error);
  }

  next();
};
