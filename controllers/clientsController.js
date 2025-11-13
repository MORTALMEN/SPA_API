const { Client } = require('../models');

// Вивести всіх
exports.getAll = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.render('clients.njk', { title: 'Клієнти', clients });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Показати форму редагування
exports.getEditForm = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).send('Клієнта не знайдено');
    res.render('client_form.njk', { title: 'Редагувати клієнта', client, action: `/clients/edit/${client.ClientID}` });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Додавання
exports.create = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Phone, username, password, role } = req.body;
    await Client.create({ FirstName, LastName, Email, Phone, username, password, role });
    res.redirect('/clients');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Оновлення
exports.update = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Phone, username, password, role } = req.body;
    await Client.update(
      { FirstName, LastName, Email, Phone, username, password, role },
      { where: { ClientID: req.params.id } }
    );
    res.redirect('/clients');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Видалення
exports.delete = async (req, res) => {
  try {
    await Client.destroy({ where: { ClientID: req.params.id } });
    res.redirect('/clients');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
