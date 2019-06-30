const { TransactionsRepository } = require('../repositories/TransactionsRepository');
const { TransactionNotFoundException, InvalidTransactionId, NotEnoughBalanceException } = require('../errors');
const isNumber = require('../utils/isNumber');
const { Transaction } = require('../domain/Transaction');

class TransactionService {
    static add(transaction) {
        transaction.validate();
        const actualBalance = TransactionsRepository.getBalance();
        if (actualBalance < transaction.getAmount()) {
            throw NotEnoughBalanceException();
        }
        const effectiveTransaction = TransactionsRepository.add(transaction);
        return Transaction.fromJson(effectiveTransaction);
    }

    static getById(id) {
        if (!isNumber(id)) {
            throw InvalidTransactionId();
        }
        const realId = Number.parseInt(id, 10);
        const transaction = TransactionsRepository.getById(realId);
        if (!transaction) {
            throw TransactionNotFoundException();
        }
        return Transaction.fromJson(transaction);
    }

    static getAll() {
        return TransactionsRepository.getAll().map(transaction => Transaction.fromJson(transaction))
    }

    static getBalance() {
        return TransactionsRepository.getBalance();
    }

}

module.exports = { TransactionService };