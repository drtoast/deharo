'use strict';

import _ from 'lodash';
import Reflux from 'reflux';
import React from 'react/addons';
import TransactionFormActions from '../actions/TransactionFormActions'
import TransactionStore from './TransactionStore'

var TransactionFormStore = Reflux.createStore({
  listenables: TransactionFormActions,

  init() {
    this.transaction = { amount: 0, description: '', shares: {}, cents: {} };
  },

  onSelectTransaction(transaction_id) {
    let transaction = TransactionStore.getTransaction(transaction_id);
    this.transaction = _.cloneDeep(transaction);
    this.calculateCents();
    console.log('TransactionFormStore#onSelectTransaction', this.transaction.shares);
    this.trigger(this.transaction);
  },

  onChangeShares(accountID, shares) {
    this.transaction.shares[accountID] = shares;
    this.calculateCents();
    this.trigger(this.transaction);
  },

  onChangeAmount(cents) {
    this.transaction.amount = cents;
    this.calculateCents();
    this.trigger(this.transaction);
  },

  onChangeDescription(description) {
    this.transaction.description = description;
    this.trigger(this.transaction);
  },

  calculateCents() {
    if(!this.transaction.hasOwnProperty('cents')) {
      this.transaction.cents = {};
    };

    let total = this.totalShares();

    _.forOwn(this.transaction.shares, (shares, accountID) => {
      let cents = (shares / total) * this.transaction.amount;
      console.log(`calculateCents: ${accountID} => ${shares}/${total} * ${this.transaction.amount} = ${cents}`);
      this.transaction.cents[accountID] = cents;
    });
  },

  totalShares() {
    let totalShares = 0;
    _.forOwn(this.transaction.shares, (shares, accountID) => {
      totalShares += parseInt(shares);
    });
    return totalShares;
  }
});

export default TransactionFormStore;
