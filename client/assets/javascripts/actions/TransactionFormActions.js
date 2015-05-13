'use strict';

import Reflux from 'reflux';

var TransactionFormActions = Reflux.createActions([
  "changeShares",
  "changeAmount",
  "changeDescription",
  "changeAccount",
  "equalizePersonalShares",
  "equalizeBankShares",
  "submitForm",
  "resetForm",
  "deleteTransaction"
]);

export default TransactionFormActions;
