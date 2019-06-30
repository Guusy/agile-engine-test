class TransactionsRepository {
  constructor() {
    this.balance = 10000;
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
    return new Promise((res) => {
      this.modifyBalanceWith(transaction.getAmount());
      const newTransaction = {
        ...transaction,
        id: this.getLastId(),
        effectiveDate: new Date()
      };
      this.transactions.push(newTransaction);
      return res(newTransaction);
    });
  }

  getLastId() {
    return this.transactions.length;
  }

  getById(id) {
    return this.transactions.find(transaction => transaction.id === id);
  }

  getBalance() {
    return this.balance;
  }

  modifyBalanceWith(amount) {
    this.balance = this.balance + amount;
  }
}

module.exports = {
  TransactionsRepository: new TransactionsRepository()
};
