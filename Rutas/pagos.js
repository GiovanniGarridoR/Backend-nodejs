// routes/payments.js
const express = require('express');
const router = express.Router();
const transaction = require('../configuracion/Transbank'); // Importa la configuración de Transbank

// Ruta para iniciar la transacción
router.post('/pagar', async (req, res) => {
  const { buyOrder, sessionId, amount, returnUrl } = req.body;

  try {
    const createResponse = await transaction.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );
    res.status(200).json(createResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para confirmar la transacción
router.post('/confirmar', async (req, res) => {
  const { token } = req.body;

  try {
    const commitResponse = await transaction.commit(token);
    res.status(200).json(commitResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
