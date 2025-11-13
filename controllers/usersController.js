const { User } = require('../models');

exports.getAll = async (req, res) => {
  const users = await User.findAll();
  res.render('users.njk', { title: 'Користувачі', users });
};

exports.getEditForm = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.render('user_form.njk', { title: 'Редагувати користувача', user, action: `/users/edit/${user.UserID}` });
};

exports.create = async (req, res) => {
  const { username, password, role } = req.body;
  await User.create({ username, password, role });
  res.redirect('/users');
};

exports.update = async (req, res) => {
  const { username, password, role } = req.body;
  await User.update({ username, password, role }, { where: { UserID: req.params.id } });
  res.redirect('/users');
};

exports.delete = async (req, res) => {
  await User.destroy({ where: { UserID: req.params.id } });
  res.redirect('/users');
};
