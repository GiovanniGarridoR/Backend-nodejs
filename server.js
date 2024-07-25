import express from 'express';
import bodyParser from 'body-parser';
import productosRouter from './rutas/productos.js';
import clientesRouter from './rutas/Cliente.js';
// Importa otros routers si es necesario

const app = express();
app.use(bodyParser.json());

// Usa los routers
app.use('/productos', productosRouter);
app.use('/clientes', clientesRouter);
// Usa otros routers si es necesario

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
