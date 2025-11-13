const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');

router.get('/', paymentsController.getAll);
router.get('/add', (req, res) => res.render('payment_form.njk', { title: 'Додати платіж', payment: {}, action: '/payments/add' }));
router.post('/add', paymentsController.create);
router.get('/edit/:id', paymentsController.getEditForm);
router.post('/edit/:id', paymentsController.update);
router.get('/delete/:id', paymentsController.delete);

module.exports = router;
