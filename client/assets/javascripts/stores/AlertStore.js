'use strict';

import _ from 'lodash';
import Reflux from 'reflux';
import React from 'react/addons';
import AlertActions from '../actions/AlertActions';

var AlertStore = Reflux.createStore({
  listenables: AlertActions,

  getInitialState() {
    return { alert: { level: 'success', message: '', visible: false } }
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
    this.alert = {
      level: level,
      message: message,
      visible: true
    }

    this.trigger(this.alert);

    if(level == 'success') {
      if(this._timeout) {
        clearTimeout(this._timeout)
      }

      this._timeout = setTimeout(() => {
        this.alert.visible = false;
        this.trigger(this.alert);
      }, 3000)
    }
  }
})

export default AlertStore;
