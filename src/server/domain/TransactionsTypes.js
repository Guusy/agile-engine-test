const { CREDIT, DEBIT } = require('../utils/constants');

module.exports = {
  [CREDIT]: {
    getRealAmount: amount => amount * (1)
  },
  [DEBIT]: {
    getRealAmount: amount => amount * (-1)
  }
};
