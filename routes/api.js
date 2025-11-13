// routes/api.js
const express = require('express');
const router = express.Router();

const { Client } = require('../models/Client');
const { Specialist } = require('../models/Specialist');
const { Service } = require('../models/Service');
const { Booking } = require('../models/Booking');

// ✅ Усі API-ендпоїнти

router.get('/clients', async (req, res) => {
  try {
    const data = await Client.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/specialists', async (req, res) => {
  try {
    const data = await Specialist.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/services', async (req, res) => {
  try {
    const data = await Service.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/bookings', async (req, res) => {
  try {
    const data = await Booking.findAll({
      include: [Client, Specialist, Service]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
