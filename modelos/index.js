// models/index.js
const sequelize = require('../configuracion/database');

const Envio = require('./envio');
const Productos = require('./productos');
const Ordenes = require('./Ordenes');
const Promociones = require('./Promociones');
const SoporteCliente = require('./SoporteCliente');
const AnalisisReporte = require('./AnalisisReportes');
const OrdenProducto = require('./ordenesProductos');
const Cliente = require('./Cliente');


// Define relaciones
Productos.hasMany(Ordenes, { foreignKey: 'productoId' });
Ordenes.belongsTo(Productos, { foreignKey: 'productoId' });

Ordenes.hasOne(Envio, { foreignKey: 'ordenId' });
Envio.belongsTo(Ordenes, { foreignKey: 'ordenId' });


Cliente.hasMany(Ordenes, { foreignKey: 'ClienteID' });
Ordenes.belongsTo(Cliente, { foreignKey: 'ClienteID' });

Ordenes.belongsToMany(Productos, { through: OrdenProducto, foreignKey: 'OrdenID' });
Productos.belongsToMany(Ordenes, { through: OrdenProducto, foreignKey: 'ProductoID' });

Ordenes.hasOne(Envio, { foreignKey: 'OrdenID' });
Envio.belongsTo(Ordenes, { foreignKey: 'OrdenID' });

Cliente.hasMany(SoporteCliente, { foreignKey: 'ClienteID' });
SoporteCliente.belongsTo(Cliente, { foreignKey: 'ClienteID' });

Ordenes.hasMany(Promociones, { foreignKey: 'OrdenID' });
Promociones.belongsTo(Ordenes, { foreignKey: 'OrdenID' });

Ordenes.hasMany(AnalisisReporte, { foreignKey: 'OrdenID' });
AnalisisReporte.belongsTo(Ordenes, { foreignKey: 'OrdenID' });

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected!');
        await sequelize.sync({ alter: false }); // Usa force: true solo si estás seguro de que quieres borrar y recrear tablas
        console.log('Database synced');
    } catch (error) {
        console.error('Error syncing database:', error.message);
        console.error('Full error:', error);
    }
};

module.exports = {
    Productos,
    Ordenes,
    OrdenProducto,
    Envio,
    Promociones,
    SoporteCliente,
    AnalisisReporte,
    Cliente,
    sequelize,
    syncDatabase
};
