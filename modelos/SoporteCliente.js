const { DataTypes } = require('sequelize');
const sequelize = require('../configuracion/database'); // Asume que tienes una configuración de la base de datos en un archivo database.js

const SoporteCliente = sequelize.define('SoporteCliente', {
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    asunto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendiente'
    }
}, {
    timestamps: true,
    tableName: 'soporte_cliente'
});

module.exports = SoporteCliente;
