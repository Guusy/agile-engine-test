const isNumber = require('../utils/isNumber');
const { InvalidAmountException } = require('../errors');
class TransactionBody {
    constructor() {
        this.type = null
        this.amount = null
        this.validate = this.validate.bind(this);
    }
    getAmount() {
        return this.amount
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

    validate() {
        if (!isNumber(this.amount)) {
            throw InvalidAmountException();
        }
    }

}
module.exports = { TransactionBody };
