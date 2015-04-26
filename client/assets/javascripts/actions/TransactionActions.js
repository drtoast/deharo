'use strict';

import Reflux from 'reflux';

var TransactionActions = Reflux.createActions([
  "editTransaction",
  "addTransaction",
  "updateTransaction",
  "selectTransaction",
  "changeTransaction"
]);

export default TransactionActions;
