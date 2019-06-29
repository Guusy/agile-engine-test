const { TransactionsRepository } = require('../repositories/TransactionsRepository');
const { InvalidAmountException, TransactionNotFoundException } = require('../errors');
class TransactionService {
    static add(transaction) {
        const actualBalance = TransactionsRepository.getBalance();
        if (actualBalance < transaction.getAmount()) {
            throw InvalidAmountException();
        }
        TransactionsRepository.add(transaction);
    }

    static getById(id) {
        const transaction = TransactionsRepository.getById(id)
        if (!transaction) {
            throw TransactionNotFoundException()
        }
        return transaction
    }

}

module.exports = { TransactionService };