// models/Envio.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuracion/database');

const Envio = sequelize.define('Envio', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    ordenId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Ordenes', // Nombre de la tabla a la que se refiere la clave foránea
            key: 'id'
        }
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigoPostal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaEnvio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    estadoEnvio: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendiente' // Puedes establecer un valor por defecto según sea necesario
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    fechaActualizacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'envio',
    timestamps: true // Esto automáticamente añade createdAt y updatedAt
});

module.exports = Envio;
