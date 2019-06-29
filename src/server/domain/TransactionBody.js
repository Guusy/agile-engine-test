class TransactionBody {
    constructor() {
        this.type = null
        this.amount = null
    }
    toJson() {
        return JSON.stringify({ ...this })
    }

    static fromJson(json) {
        const transaction = new TransactionBody();
        transaction.type = json.type;
        transaction.amount = json.amount;
        return transaction
    }

}
module.exports = { TransactionBody };
