const express = require('express');
const router = express.Router();

// Importa el modelo de Envio
const { Envio } = require('../modelos');

// Obtener todos los envíos
router.get('/', async (req, res) => {
    try {
        const envios = await Envio.findAll();
        res.json(envios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un envío por su ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const envio = await Envio.findByPk(id);
        if (!envio) {
            res.status(404).json({ message: 'Envío no encontrado' });
            return;
        }
        res.json(envio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo envío
router.post('/', async (req, res) => {
    const nuevoEnvio = req.body;
    try {
        const envio = await Envio.create(nuevoEnvio);
        res.status(201).json(envio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un envío existente
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    try {
        const envio = await Envio.findByPk(id);
        if (!envio) {
            res.status(404).json({ message: 'Envío no encontrado' });
            return;
        }
        await envio.update(datosActualizados);
        res.json(envio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un envío
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const envio = await Envio.findByPk(id);
        if (!envio) {
            res.status(404).json({ message: 'Envío no encontrado' });
            return;
        }
        await envio.destroy();
        res.json({ message: 'Envío eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
