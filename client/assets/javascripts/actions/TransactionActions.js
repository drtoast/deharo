'use strict';

import Reflux from 'reflux';

var TransactionActions = Reflux.createActions({
  "fetchTransactions": { asyncResult: true },
  "saveTransaction": { asyncResult: true },
  "deleteTransaction": { asyncResult: true },
  "selectTransaction": {}
});

export default TransactionActions;
