const { Booking, Client, Specialist, Service } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Client, attributes: ['ClientID', 'Name'] },
        { model: Specialist, attributes: ['SpecialistID', 'Name'] },
        { model: Service, attributes: ['ServiceID', 'ServiceName'] }
      ],
      order: [['BookingID', 'ASC']]
    });

    res.render('bookings.njk', { title: 'Бронювання', bookings });
  } catch (error) {
    console.error('❌ Error loading bookings:', error);
    res.status(500).send('Помилка сервера при отриманні бронювань');
  }
};

exports.getEditForm = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    res.render('booking_form.njk', { 
      title: 'Редагувати бронювання', 
      booking, 
      action: `/bookings/edit/${booking.BookingID}` 
    });
  } catch (error) {
    console.error('❌ Error loading booking:', error);
    res.status(500).send('Помилка сервера');
  }
};

exports.create = async (req, res) => {
  try {
    const { ClientID, SpecialistID, ServiceID, BookingDate, BookingTime, Status } = req.body;
    await Booking.create({ ClientID, SpecialistID, ServiceID, BookingDate, BookingTime, Status });
    res.redirect('/bookings');
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    res.status(500).send('Помилка при створенні бронювання');
  }
};

exports.update = async (req, res) => {
  try {
    const { ClientID, SpecialistID, ServiceID, BookingDate, BookingTime, Status } = req.body;
    await Booking.update(
      { ClientID, SpecialistID, ServiceID, BookingDate, BookingTime, Status },
      { where: { BookingID: req.params.id } }
    );
    res.redirect('/bookings');
  } catch (error) {
    console.error('❌ Error updating booking:', error);
    res.status(500).send('Помилка при оновленні бронювання');
  }
};

exports.delete = async (req, res) => {
  try {
    await Booking.destroy({ where: { BookingID: req.params.id } });
    res.redirect('/bookings');
  } catch (error) {
    console.error('❌ Error deleting booking:', error);
    res.status(500).send('Помилка при видаленні бронювання');
  }
};
