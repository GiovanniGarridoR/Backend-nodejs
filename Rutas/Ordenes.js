const express = require('express');
const Orden = require('../modelos/Ordenes');
const router = express.Router();

// Obtener todas las órdenes
router.get('/', async (req, res) => {
    try {
        const ordenes = await Orden.findAll();
        res.json(ordenes);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las órdenes' });
    }
});

// Crear una nueva orden
router.post('/', async (req, res) => {
    try {
        const orden = await Orden.create(req.body);
        res.json(orden);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear la orden' });
    }
});

// Obtener una orden por ID
router.get('/:id', async (req, res) => {
    try {
        const orden = await Orden.findByPk(req.params.id);
        if (orden) {
            res.json(orden);
        } else {
            res.status(404).json({ error: 'Orden no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener la orden' });
    }
});

// Actualizar una orden por ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Orden.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedOrden = await Orden.findByPk(req.params.id);
            res.json(updatedOrden);
        } else {
            res.status(404).json({ error: 'Orden no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la orden' });
    }
});

// Eliminar una orden por ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Orden.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Orden eliminada' });
        } else {
            res.status(404).json({ error: 'Orden no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la orden' });
    }
});

module.exports = router;
