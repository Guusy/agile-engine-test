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
}

module.exports = {
    TransactionsRepository: new TransactionsRepository()
};
