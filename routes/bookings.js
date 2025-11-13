const express = require('express');
const router = express.Router();
const { Booking, Client, Specialist, Service } = require('../models');

// ✅ PUT — редагування бронювання
router.put('/:id', async (req, res) => {
  try {
    const { clientId, specialistId, serviceId, date, time, status } = req.body;

    // ======== 🔍 ВАЛІДАЦІЯ НА СТОРОНІ СЕРВЕРА ========
    if (!clientId || !specialistId || !serviceId)
      return res.status(400).json({ error: 'Вкажіть клієнта, спеціаліста та сервіс.' });

    if (!date || !time)
      return res.status(400).json({ error: 'Дата та час обов’язкові.' });

    // Перевірка формату дати
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date))
      return res.status(400).json({ error: 'Невірний формат дати (рррр-мм-дд).' });

    // Перевірка часу
    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(time))
      return res.status(400).json({ error: 'Невірний формат часу (год:хв).' });

    // Знаходимо бронювання
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Бронювання не знайдено.' });

    // Оновлюємо дані
    await booking.update({ clientId, specialistId, serviceId, date, time, status });

    res.json({ message: 'Бронювання оновлено успішно!', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка сервера при оновленні бронювання.' });
  }
});

module.exports = router;
