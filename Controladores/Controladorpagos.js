const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));

const iniciarTransaccion = async (req, res) => {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;

    try {
        const response = await webpayPlus.create(buyOrder, sessionId, amount, returnUrl);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const confirmarTransaccion = async (req, res) => {
    const { token_ws } = req.body;

    try {
        const response = await webpayPlus.commit(token_ws);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    iniciarTransaccion,
    confirmarTransaccion
};
