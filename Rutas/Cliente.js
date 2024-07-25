const express = require('express');
const Cliente = require('../modelos/Cliente');
const router = express.Router();

// Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        res.json(cliente);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
});

// Actualizar un cliente por ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Cliente.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCliente = await Cliente.findByPk(req.params.id);
            res.json(updatedCliente);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
});

// Eliminar un cliente por ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Cliente.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Cliente eliminado' });
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
});

module.exports = router;
