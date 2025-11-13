const express = require('express');
const router = express.Router();
const { ensureRole } = require('../middlewares/auth');
const clientsCtrl = require('../controllers/clientsController');
const specialistsCtrl = require('../controllers/specialistsController');
const servicesCtrl = require('../controllers/servicesController');
const bookingsCtrl = require('../controllers/bookingsController');
const paymentsCtrl = require('../controllers/paymentsController');
const { Client, Specialist, Service, Booking } = require('../models');

// Dashboard
router.get('/', ensureRole(['admin','user']), async (req, res) => {
  const counts = {
    clients: await Client.count(),
    specialists: await Specialist.count(),
    services: await Service.count(),
    bookings: await Booking.count()
  };
  res.render('dashboard', { counts });
});

// Clients
router.get('/clients', ensureRole(['admin','user']), clientsCtrl.listView);
router.post('/clients', ensureRole(['admin','user']), clientsCtrl.create);
router.put('/clients/:id', ensureRole(['admin','user']), clientsCtrl.update);
router.delete('/clients/:id', ensureRole('admin'), clientsCtrl.delete);

// Specialists
router.get('/specialists', ensureRole(['admin','user']), specialistsCtrl.listView);
router.post('/specialists', ensureRole(['admin','user']), specialistsCtrl.create);
router.put('/specialists/:id', ensureRole(['admin','user']), specialistsCtrl.update);
router.delete('/specialists/:id', ensureRole('admin'), specialistsCtrl.delete);

// Services
router.get('/services', ensureRole(['admin','user']), servicesCtrl.listView);
router.post('/services', ensureRole(['admin','user']), servicesCtrl.create);
router.put('/services/:id', ensureRole(['admin','user']), servicesCtrl.update);
router.delete('/services/:id', ensureRole('admin'), servicesCtrl.delete);

// Bookings
router.get('/bookings', ensureRole(['admin','user']), bookingsCtrl.listView);
router.post('/bookings', ensureRole(['admin','user']), bookingsCtrl.create);
router.put('/bookings/:id', ensureRole(['admin','user']), bookingsCtrl.update);
router.delete('/bookings/:id', ensureRole('admin'), bookingsCtrl.delete);

// Payments (simple)
router.get('/payments', ensureRole(['admin','user']), paymentsCtrl.listView);
router.post('/payments', ensureRole(['admin','user']), paymentsCtrl.create);
router.delete('/payments/:id', ensureRole('admin'), paymentsCtrl.delete);

module.exports = router;
