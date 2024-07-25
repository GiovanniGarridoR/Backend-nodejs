/// modelos/ordenProducto.js

const { DataTypes } = require('sequelize');
const sequelize = require('../configuracion/database');

const OrdenProducto = sequelize.define('OrdenProducto', {
    OrdenID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Ordenes',
            key: 'id'
        }
    },
    ProductoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Productos',
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'Ordenes_productos',
    timestamps: false
});

module.exports = OrdenProducto;

