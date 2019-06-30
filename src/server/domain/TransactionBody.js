const isNumber = require('../utils/isNumber');
const { InvalidAmountException, InvalidTypeException } = require('../errors');
const { CREDIT, DEBIT } = require('../utils/constants');
const TransactionsTypes = require('./TransactionsTypes');
class TransactionBody {
    constructor() {
        this.availableTypes = [CREDIT, DEBIT]
        this.type = null
        this.amount = null
        this.validate = this.validate.bind(this);
    }
    getAmount() {
        return TransactionsTypes[this.type].getRealAmount(this.amount)
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
        if (!this.availableTypes.includes(this.type)) {
            throw InvalidTypeException();
        }
        if (!isNumber(this.amount)) {
            throw InvalidAmountException();
        }
    }

}
module.exports = { TransactionBody };
