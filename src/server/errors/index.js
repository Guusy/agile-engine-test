const NOT_FOUND_EXCEPTION = { status: 404 };
module.exports = {
    InvalidAmountException: (message = '', status = '') => ({ message, status }),
    TransactionNotFoundException: (message = '') => ({ ...NOT_FOUND_EXCEPTION, message })
}