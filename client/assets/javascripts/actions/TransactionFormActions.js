'use strict';

import Reflux from 'reflux';

var TransactionFormActions = Reflux.createActions([
  "selectTransaction",
  "changeShares",
  "changeAmount",
  "changeDescription",
  "changeAccount",
  "equalizePersonalShares",
  "equalizeBankShares",
  "submitForm",
  "resetForm"
]);

export default TransactionFormActions;
