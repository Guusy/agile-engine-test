const { TransactionsRepository } = require('../repositories/TransactionsRepository');
const { InvalidAmountException, TransactionNotFoundException, InvalidTransactionId } = require('../errors');
const isNumber = require('../utils/isNumber');

class TransactionService {
    static add(transaction) {
        const actualBalance = TransactionsRepository.getBalance();
        if (actualBalance < transaction.getAmount()) {
            throw InvalidAmountException();
        }
        TransactionsRepository.add(transaction);
    }

    static getById(id) {
        if (!isNumber(id)) {
            throw InvalidTransactionId();
        }
        const transaction = TransactionsRepository.getById(id);
        if (!transaction) {
            throw TransactionNotFoundException();
        }
        return transaction;
    }

    static getAll() {
        return TransactionsRepository.getAll();
    }

    static getBalance() {
        return TransactionsRepository.getBalance();
    }

}

module.exports = { TransactionService };