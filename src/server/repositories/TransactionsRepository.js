class TransactionsRepository {
    constructor() {
        this.transactions = []
    }

    reset() {
        this.transactions = []
    }
    add(transaction) {
        this.transactions.push(transaction)
    }

}

module.exports = {
    TransactionsRepository: new TransactionsRepository()
};
