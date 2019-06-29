module.exports = {
    InvalidAmountException: (message = '', status = '') => ({ message, status }),
    TransactionNotFoundException: (message = '', status = '') => ({ message, status: 404 })
}