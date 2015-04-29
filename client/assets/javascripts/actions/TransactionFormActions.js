'use strict';

import Reflux from 'reflux';

var TransactionFormActions = Reflux.createActions([
  "selectTransaction",
  "changeShares",
  "changeAmount",
  "changeDescription",
  "saveTransaction"
]);

export default TransactionFormActions;
