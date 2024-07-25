const express = require('express');
const router = express.Router();
const { AnalisisReporte } = require('../modelos');

// Obtener todos los análisis y reportes
router.get('/', async (req, res) => {
    try {
        const reportes = await AnalisisReporte.findAll();
        res.json(reportes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un análisis o reporte por su ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const reporte = await AnalisisReporte.findByPk(id);
        if (!reporte) {
            res.status(404).json({ message: 'Análisis/Reporte no encontrado' });
            return;
        }
        res.json(reporte);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo análisis o reporte
router.post('/', async (req, res) => {
    const nuevoReporte = req.body;
    try {
        const reporte = await AnalisisReporte.create(nuevoReporte);
        res.status(201).json(reporte);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un análisis o reporte existente
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    try {
        const reporte = await AnalisisReporte.findByPk(id);
        if (!reporte) {
            res.status(404).json({ message: 'Análisis/Reporte no encontrado' });
            return;
        }
        await reporte.update(datosActualizados);
        res.json(reporte);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un análisis o reporte
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const reporte = await AnalisisReporte.findByPk(id);
        if (!reporte) {
            res.status(404).json({ message: 'Análisis/Reporte no encontrado' });
            return;
        }
        await reporte.destroy();
        res.json({ message: 'Análisis/Reporte eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
