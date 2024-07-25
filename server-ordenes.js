const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, syncDatabase } = require('./modelos');
const clientesRouter = require('./rutas/Cliente');
const productosRoutes = require('./rutas/productos');

const app = express();

app.use(bodyParser.json());

// Rutas de la API para órdenes
app.use('/api/ordenes', require('./Rutas/Ordenes'));
app.use('/api', clientesRouter);
app.use('/api', productosRoutes);

const PORT = 3000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected!');
        await syncDatabase(); // Sincroniza la base de datos en el arranque
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
