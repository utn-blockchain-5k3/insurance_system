const express = require('express');
const router = express.Router();
const insuranceService = require('../services/insuranceService');

// Ruta para inicializar el ledger
router.post('/init-ledger', async (req, res) => {
    try {
        const result = await insuranceService.initLedger();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para crear un seguro
router.post('/create-insurance', async (req, res) => {
    try {
        const { insuranceId, policyDetails } = req.body;
        const result = await insuranceService.createInsurance(insuranceId, JSON.stringify(policyDetails));
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para registrar una reclamación
router.post('/file-claim', async (req, res) => {
    try {
        const { insuranceId, claimDetails } = req.body;
        const result = await insuranceService.fileClaim(insuranceId, JSON.stringify(claimDetails));
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para evaluar una reclamación
router.post('/evaluate-claim', async (req, res) => {
    try {
        const { insuranceId, claimIndex, evaluationResult } = req.body;
        const result = await insuranceService.evaluateClaim(insuranceId, claimIndex, evaluationResult);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para pagar una reclamación
router.post('/pay-claim', async (req, res) => {
    try {
        const { insuranceId, claimIndex, paymentAmount } = req.body;
        const result = await insuranceService.payClaim(insuranceId, claimIndex, paymentAmount);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para obtener los detalles de un contrato de seguro
router.get('/get-insurance/:insuranceId', async (req, res) => {
    try {
        const { insuranceId } = req.params;
        const result = await insuranceService.getInsurance(insuranceId);
        res.status(200).send(JSON.parse(result));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
