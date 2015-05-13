'use strict';

import Reflux from 'reflux';

var AlertActions = Reflux.createActions([
  "success",
  "error",
  "info",
  "warning"
]);

export default AlertActions;
