const express = require('express');

const router = express.Router();
const { TransactionService } = require('../services/TransactionService');
const { TransactionBody } = require('../domain/TransactionBody');

router.post('/', async (req, res, next) => {
  const { body } = req;
  try {
    const newTransaction = TransactionBody.fromJson(body);
    const transaction = await TransactionService.add(newTransaction);
    return res.status(201).json(transaction.toJson());
  } catch (error) {
    return next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const transactions = await TransactionService.getAll();
    return res.status(200).json(transactions);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const transaction = await TransactionService.getById(id);
    return res.status(200).json(transaction.toJson());
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
