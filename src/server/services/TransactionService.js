const { TransactionsRepository } = require('../repositories/TransactionsRepository');
const { InvalidAmountException } = require('../errors');
class TransactionService {
    static add(transaction) {
        const actualBalance = TransactionsRepository.getBalance();
        if (actualBalance < transaction.getAmount()) {
            throw InvalidAmountException();
        }
        TransactionsRepository.add(transaction);
    }

}

module.exports = { TransactionService };