const { Service } = require('../models');

exports.getAll = async (req, res) => {
  const services = await Service.findAll();
  res.render('services.njk', { title: 'Послуги', services });
};

exports.getEditForm = async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  res.render('service_form.njk', { title: 'Редагувати послугу', service, action: `/services/edit/${service.ServiceID}` });
};

exports.create = async (req, res) => {
  const { ServiceName, Duration, Price } = req.body;
  await Service.create({ ServiceName, Duration, Price });
  res.redirect('/services');
};

exports.update = async (req, res) => {
  const { ServiceName, Duration, Price } = req.body;
  await Service.update({ ServiceName, Duration, Price }, { where: { ServiceID: req.params.id } });
  res.redirect('/services');
};

exports.delete = async (req, res) => {
  await Service.destroy({ where: { ServiceID: req.params.id } });
  res.redirect('/services');
};
