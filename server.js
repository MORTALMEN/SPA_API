// server.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const nunjucks = require('nunjucks');
const path = require('path');
const { sequelize } = require('./models'); // models/index.js exports sequelize
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// view engine
nunjucks.configure('views', { autoescape: true, express: app });
app.set('view engine', 'njk');
app.use(express.static(path.join(__dirname, 'public')));

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// expose user/messages to views
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.messages = req.flash();
  next();
});

// routes
app.use('/', routes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected');
    // await sequelize.sync({ alter: true }); // enable in dev if you want
    app.listen(PORT, () => console.log(`🚀 Server listening http://localhost:${PORT}`));
  } catch (err) {
    console.error('DB connection error', err);
    process.exit(1);
  }
})();
