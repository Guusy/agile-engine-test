const express = require('express')
const router = express.Router();
const { TransactionService } = require('../services/TransactionService');

router.get('/', (req, res, next) => {
    try {
        const transactions = TransactionService.getAll();
        return res.status(200).json(transactions);
    } catch (error) {
        return next(error);
    }
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    try {
        const transaction = TransactionService.getById(id);
        return res.status(200).json(transaction);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
