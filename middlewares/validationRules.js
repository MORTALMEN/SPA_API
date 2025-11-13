// middlewares/validationRules.js
const { body, validationResult } = require('express-validator');

exports.clientCreateRules = [
  body('username').isLength({ min: 3 }).withMessage('username >=3'),
  body('Email').optional({ checkFalsy: true }).isEmail().withMessage('Invalid email'),
  (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array().map(e=>e.msg).join(', '));
      return res.redirect('back');
    }
    next();
  }
];

