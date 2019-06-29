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

module.exports = router;
