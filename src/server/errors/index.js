const NOT_FOUND_EXCEPTION = { status: 404 };
const BAD_REQUEST = { status: 400 };
module.exports = {
    InvalidAmountException: (message = '', status = '') => ({ message, status }),
    TransactionNotFoundException: () => ({ ...NOT_FOUND_EXCEPTION, message: "Transaction not found" }),
    InvalidTransactionId: () => ({ ...BAD_REQUEST, message: 'Invalid id' })
}