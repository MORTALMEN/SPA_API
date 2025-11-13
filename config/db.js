const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("SPA", "root", "", {
  host: "localhost",
  port: 3306, // або 8000, якщо твій MySQL реально працює на цьому порту
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("✅ MySQL connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

module.exports = sequelize;
