const express = require('express');
const router = express.Router();
const { SoporteCliente } = require('../modelos');

// Obtener todas las solicitudes de soporte
router.get('/', async (req, res) => {
    try {
        const solicitudes = await SoporteCliente.findAll();
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una solicitud de soporte por su ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const solicitud = await SoporteCliente.findByPk(id);
        if (!solicitud) {
            res.status(404).json({ message: 'Solicitud de soporte no encontrada' });
            return;
        }
        res.json(solicitud);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva solicitud de soporte
router.post('/', async (req, res) => {
    const nuevaSolicitud = req.body;
    try {
        const solicitud = await SoporteCliente.create(nuevaSolicitud);
        res.status(201).json(solicitud);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar una solicitud de soporte existente
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    try {
        const solicitud = await SoporteCliente.findByPk(id);
        if (!solicitud) {
            res.status(404).json({ message: 'Solicitud de soporte no encontrada' });
            return;
        }
        await solicitud.update(datosActualizados);
        res.json(solicitud);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una solicitud de soporte
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const solicitud = await SoporteCliente.findByPk(id);
        if (!solicitud) {
            res.status(404).json({ message: 'Solicitud de soporte no encontrada' });
            return;
        }
        await solicitud.destroy();
        res.json({ message: 'Solicitud de soporte eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
