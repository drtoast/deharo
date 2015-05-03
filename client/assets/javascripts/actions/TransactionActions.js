'use strict';

import Reflux from 'reflux';

var TransactionActions = Reflux.createActions({
  "saveTransaction": { asyncResult: true },
  "selectTransaction": {}
});

export default TransactionActions;
