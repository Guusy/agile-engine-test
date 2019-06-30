const express = require('express');

const router = express.Router();
const { TransactionService } = require('../services/TransactionService');

router.get('/', async (req, res, next) => {
  try {
    const balance = await TransactionService.getBalance();
    return res.status(200).json({ balance });
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
