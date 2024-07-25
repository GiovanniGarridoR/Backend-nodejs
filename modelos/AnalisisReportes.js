const { DataTypes } = require('sequelize');
const sequelize = require('../configuracion/database'); // Asume que tienes una configuración de la base de datos en un archivo database.js

const AnalisisReporte = sequelize.define('AnalisisReporte', {
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fechaGeneracion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    datos: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'analisis_reportes'
});

module.exports = AnalisisReporte;
