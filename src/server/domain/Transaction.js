class Transaction {
    constructor() {
        this.id = null
        this.type = null
        this.amount = null
        this.effectiveDate = null
    }
    toJson() {
        return JSON.stringify({ ...this })
    }

    static fromJson(json) {
        const transaction = new Transaction();
        transaction.id = json.id;
        transaction.type = json.type;
        transaction.amount = json.amount;
        transaction.effectiveDate = json.effectiveDate;
        return transaction
    }

}
module.exports = { Transaction };
