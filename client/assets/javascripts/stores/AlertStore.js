'use strict';

import _ from 'lodash';
import Reflux from 'reflux';
import React from 'react/addons';
import AlertActions from '../actions/AlertActions';

var AlertStore = Reflux.createStore({
  listenables: AlertActions,

  init() {
    this.alert = { level: 'success', message: 'Hello Alert Store', visible: true }
  },

  onCreateAlert(alert) {
    _.assign(this.alert, alert);
    this.alert.visible = true;
    this.trigger(this.alert);
  },

  onSuccess(message) {
    this._triggerAlert('success', message);
  },

  onError(message) {
    this._triggerAlert('danger', message);
  },

  onInfo(message) {
    this._triggerAlert('info', message);
  },

  onWarning(message) {
    this._triggerAlert('warning', message);
  },

  _triggerAlert(level, message) {
    this.alert.level = level;
    this.alert.message = message;
    this.alert.visible = true;
    this.trigger(this.alert);
  }

})

export default AlertStore;
