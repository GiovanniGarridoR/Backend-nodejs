const express = require('express');
const router = express.Router();
const { Promocion } = require('../modelos');

// Obtener todas las promociones
router.get('/', async (req, res) => {
    try {
        const promociones = await Promocion.findAll();
        res.json(promociones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una promoción por su ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const promocion = await Promocion.findByPk(id);
        if (!promocion) {
            res.status(404).json({ message: 'Promoción no encontrada' });
            return;
        }
        res.json(promocion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva promoción
router.post('/', async (req, res) => {
    const nuevaPromocion = req.body;
    try {
        const promocion = await Promocion.create(nuevaPromocion);
        res.status(201).json(promocion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar una promoción existente
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    try {
        const promocion = await Promocion.findByPk(id);
        if (!promocion) {
            res.status(404).json({ message: 'Promoción no encontrada' });
            return;
        }
        await promocion.update(datosActualizados);
        res.json(promocion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una promoción
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const promocion = await Promocion.findByPk(id);
        if (!promocion) {
            res.status(404).json({ message: 'Promoción no encontrada' });
            return;
        }
        await promocion.destroy();
        res.json({ message: 'Promoción eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
