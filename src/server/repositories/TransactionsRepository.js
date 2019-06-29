class TransactionsRepository {
    constructor() {
        this.transactions = [];
        this.add = this.add.bind(this);
    }

    reset() {
        this.transactions = [];
    }

    getAll() {
        return this.transactions;
    }

    add(transaction) {
        const newTransaction = {
            ...transaction,
            id: this.getLastId(),
            effectiveDate: Date.now()
        };
        this.transactions.push(newTransaction);
    }

    getLastId() {
        return this.transactions.length;
    }
    getById(id) {
        return this.transactions.find(transaction => transaction.id === id)
    }
}

module.exports = {
    TransactionsRepository: new TransactionsRepository()
};
