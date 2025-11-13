const express = require('express');
const router = express.Router();
const specialistsController = require('../controllers/specialistsController');

router.get('/', specialistsController.getAll);
router.get('/add', (req, res) => res.render('specialist_form.njk', { title: 'Додати спеціаліста', specialist: {}, action: '/specialists/add' }));
router.post('/add', specialistsController.create);
router.get('/edit/:id', specialistsController.getEditForm);
router.post('/edit/:id', specialistsController.update);
router.get('/delete/:id', specialistsController.delete);

module.exports = router;
