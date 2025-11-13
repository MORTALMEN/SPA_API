// controllers/authController.js
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.showLogin = (req, res) => res.render('auth/login');
exports.showRegister = (req, res) => res.render('auth/register');

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/auth/login',
  failureFlash: true
});

exports.postRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('error','username & password required');
      return res.redirect('/auth/register');
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, password: hash, role: 'user' });
    req.flash('success','Registered, please login');
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    req.flash('error','Registration error');
    res.redirect('/auth/register');
  }
};

exports.logout = (req, res) => {
  req.logout(()=>{});
  req.flash('success','Logged out');
  res.redirect('/');
};
