const NOT_FOUND_EXCEPTION = { status: 404, isBusinessError: true };
const BAD_REQUEST = { status: 400, isBusinessError: true };
module.exports = {
    InvalidAmountException: () => ({ ...BAD_REQUEST, message: 'Invalid amount', }),
    NotEnoughBalanceException: () => ({ ...BAD_REQUEST, message: 'Not enough balance to do this transaction', }),
    InvalidTypeException: () => ({ ...BAD_REQUEST, message: 'Invalid type', }),
    TransactionNotFoundException: () => ({ ...NOT_FOUND_EXCEPTION, message: "Transaction not found" }),
    InvalidTransactionId: () => ({ ...BAD_REQUEST, message: 'Invalid id' })
}