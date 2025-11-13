const { Payment } = require('../models');

exports.getAll = async (req, res) => {
  const payments = await Payment.findAll();
  res.render('payments.njk', { title: 'Платежі', payments });
};

exports.getEditForm = async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  res.render('payment_form.njk', { title: 'Редагувати платіж', payment, action: `/payments/edit/${payment.PaymentID}` });
};

exports.create = async (req, res) => {
  const { Amount, PaymentDate, Method } = req.body;
  await Payment.create({ Amount, PaymentDate, Method });
  res.redirect('/payments');
};

exports.update = async (req, res) => {
  const { Amount, PaymentDate, Method } = req.body;
  await Payment.update({ Amount, PaymentDate, Method }, { where: { PaymentID: req.params.id } });
  res.redirect('/payments');
};

exports.delete = async (req, res) => {
  await Payment.destroy({ where: { PaymentID: req.params.id } });
  res.redirect('/payments');
};
