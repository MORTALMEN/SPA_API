const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAll);
router.get('/add', (req, res) => res.render('user_form.njk', { title: 'Додати користувача', user: {}, action: '/users/add' }));
router.post('/add', usersController.create);
router.get('/edit/:id', usersController.getEditForm);
router.post('/edit/:id', usersController.update);
router.get('/delete/:id', usersController.delete);

module.exports = router;
