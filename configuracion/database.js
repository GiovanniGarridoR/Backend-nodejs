const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Configuración de Sequelize usando variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false, // Opcional: desactivar logging de SQL en consola
    }
);

module.exports = sequelize;
