class TransactionsRepository {
    constructor() {
        this.balance = 0;
        this.transactions = [];
        this.add = this.add.bind(this);
    }

    reset() {
        this.balance = 0;
        this.transactions = [];
    }

    getAll() {
        return this.transactions;
    }

    add(transaction) {
        this.subtractBalance(transaction.amount)
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
    getBalance() {
        return this.balance
    }
    subtractBalance(amount) {
        this.balance = this.balance - amount
    }
}

module.exports = {
    TransactionsRepository: new TransactionsRepository()
};
