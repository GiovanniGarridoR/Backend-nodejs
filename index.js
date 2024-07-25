const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./modelos');
const transaction = require('./configuracion/Transbank');
const router =require('./server-productos')


const app = express();

const { Cliente, Producto, Orden, OrdenProducto, Envio, Pago, SoporteCliente, Promocion, AnalisisReporte } = require('./modelos/index');

app.use(bodyParser.json());

// Rutas de la API
app.use('/api/productos', require('./rutas/productos'));
app.use('/api/cliente', require('./rutas/Cliente'));
app.use('/api/envios', require('./Rutas/envio'));
app.use('/api/pagos', require('./Rutas/pagos'));
app.use('/api/promociones', require('./Rutas/Promociones'));
app.use('/api/soporte-cliente', require('./Rutas/SoporteCliente'));
app.use('/api/analisis-reportes', require('./Rutas/AnalisisReportes'));


// Agrega rutas para las demás entidades...

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada!');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos requerida:', error);
    }
});
