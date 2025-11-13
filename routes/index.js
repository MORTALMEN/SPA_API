// routes/index.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const clientsRoutes = require('./clients');
const specialistsRoutes = require('./specialists');
const servicesRoutes = require('./services');
const bookingsRoutes = require('./bookings');
const paymentsRoutes = require('./payments');
const usersRoutes = require('./users');
const adminMiddleware = require('../middlewares/authMiddleware');

router.get('/', (req,res) => res.render('index'));

// auth
router.use('/auth', authRoutes);

// views/admin
router.get('/admin', adminMiddleware.ensureRole(['admin','manager','user']), (req,res) => res.render('layout',{ content: 'Admin area' }));

// resource routes (views + api)
router.use('/clients', clientsRoutes);
router.use('/specialists', specialistsRoutes);
router.use('/services', servicesRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/payments', paymentsRoutes);
router.use('/users', usersRoutes);

// minimal JSON API namespace
router.use('/api', require('./api')); // we'll create a small api router below

module.exports = router;
