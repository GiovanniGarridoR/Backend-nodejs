const { DataTypes } = require('sequelize');
const sequelize = require('../configuracion/database'); // Asume que tienes una configuración de la base de datos en un archivo database.js

const Promocion = sequelize.define('Promocion', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descuento: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'promociones'
});

module.exports = Promocion;
