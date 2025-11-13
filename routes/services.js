const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

router.get('/', servicesController.getAll);
router.get('/add', (req, res) => res.render('service_form.njk', { title: 'Додати послугу', service: {}, action: '/services/add' }));
router.post('/add', servicesController.create);
router.get('/edit/:id', servicesController.getEditForm);
router.post('/edit/:id', servicesController.update);
router.get('/delete/:id', servicesController.delete);

module.exports = router;
