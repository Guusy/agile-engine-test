/* eslint-disable class-methods-use-this */
const { TransactionsRepository } = require('../repositories/TransactionsRepository');
const { TransactionNotFoundException, InvalidTransactionId, NotEnoughBalanceException } = require('../errors');
const isNumber = require('../utils/isNumber');
const { Transaction } = require('../domain/Transaction');

class TransactionService {
  constructor() {
    this.queue = [];
    this.isDoingWriteTransaction = false;
  }

  async add(transaction) {
    transaction.validate();
    const actualBalance = TransactionsRepository.getBalance();
    if (actualBalance < transaction.getAmount()) {
      throw NotEnoughBalanceException();
    }
    return new Promise(async (res) => {
      this.isDoingWriteTransaction = true;
      const effectiveTransaction = await TransactionsRepository.add(transaction);
      this.isDoingWriteTransaction = false;
      res(Transaction.fromJson(effectiveTransaction));
      this.runQueue();
    });
  }

  getById(id) {
    if (!isNumber(id)) {
      throw InvalidTransactionId();
    }
    const realId = Number.parseInt(id, 10);
    return new Promise((res) => {
      const doSearch = () => {
        const transaction = TransactionsRepository.getById(realId);
        if (!transaction) {
          throw TransactionNotFoundException();
        }
        return Transaction.fromJson(transaction);
      };
      if (!this.isDoingWriteTransaction) {
        return res(doSearch());
      }
      this.addToQueue(() => res(doSearch()));
    });
  }

  addToQueue(fn) {
    this.queue.push({ id: this.queue.length, fn });
  }

  runQueue() {
    this.queue.forEach((element) => {
      this.removeForQueue(element.id);
      element.fn();
    });
  }

  removeForQueue(id) {
    this.queue = this.queue.filter(element => element.id !== id);
  }


  getAll() {
    return new Promise((res) => {
      const doSearch = () => TransactionsRepository.getAll().map(transaction => Transaction.fromJson(transaction));
      if (!this.isDoingWriteTransaction) {
        return res(doSearch());
      }
      this.addToQueue(() => res(doSearch()));
    });
  }

  getBalance() {
    return TransactionsRepository.getBalance();
  }
}

module.exports = { TransactionService: new TransactionService() };
