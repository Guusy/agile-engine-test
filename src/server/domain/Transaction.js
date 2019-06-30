class Transaction {
  constructor() {
    this.id = null;
    this.type = null;
    this.amount = null;
    this.effectiveDate = null;
  }

  toJson() {
    return {
      id: this.id,
      type: this.type,
      amount: this.amount,
      effectiveDate: this.effectiveDate,
    };
  }

  static fromJson(json) {
    const transaction = new Transaction();
    transaction.id = json.id;
    transaction.type = json.type;
    transaction.amount = json.amount;
    transaction.effectiveDate = json.effectiveDate;
    return transaction;
  }
}
module.exports = { Transaction };
