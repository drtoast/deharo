'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import TransactionFormActions from '../actions/TransactionFormActions'
import TransactionStore from './TransactionStore'

var TransactionFormStore = Reflux.createStore({
  listenables: TransactionFormActions,

  getInitialState() {
    this.transaction = { amount: 0, description: '' };
    return this.transaction;
  },

  onSelectTransaction(transaction_id) {
    this.transaction = TransactionStore.getTransaction(transaction_id);
    this.trigger(this.transaction);
  },

  onChangeTransaction(data) {
    Object.assign(this.transaction, data);
  }
});

export default TransactionFormStore;
