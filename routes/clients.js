const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

// Всі клієнти
router.get('/', clientsController.getAll);

// Форма додавання
router.get('/add', (req, res) => {
  res.render('client_form.njk', { title: 'Додати клієнта', client: {}, action: '/clients/add' });
});

// Створення нового
router.post('/add', clientsController.create);

// Форма редагування
router.get('/edit/:id', clientsController.getEditForm);

// Оновлення
router.post('/edit/:id', clientsController.update);

// Видалення
router.get('/delete/:id', clientsController.delete);

module.exports = router;
