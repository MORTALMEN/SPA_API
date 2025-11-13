const { Specialist } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const specialists = await Specialist.findAll();
    res.render('specialists.njk', { title: 'Спеціалісти', specialists });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getEditForm = async (req, res) => {
  try {
    const specialist = await Specialist.findByPk(req.params.id);
    if (!specialist) return res.status(404).send('Не знайдено');
    res.render('specialist_form.njk', { title: 'Редагувати спеціаліста', specialist, action: `/specialists/edit/${specialist.SpecialistID}` });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { FirstName, LastName, Specialization, Phone, Email } = req.body;
    await Specialist.create({ FirstName, LastName, Specialization, Phone, Email });
    res.redirect('/specialists');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { FirstName, LastName, Specialization, Phone, Email } = req.body;
    await Specialist.update({ FirstName, LastName, Specialization, Phone, Email }, { where: { SpecialistID: req.params.id } });
    res.redirect('/specialists');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await Specialist.destroy({ where: { SpecialistID: req.params.id } });
    res.redirect('/specialists');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
