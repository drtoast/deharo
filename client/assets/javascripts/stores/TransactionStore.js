'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import TransactionActions from '../actions/TransactionActions'
import PeriodActions from '../actions/PeriodActions';

import _ from 'lodash';

var TransactionStore = Reflux.createStore({
  listenables: TransactionActions,
  // EQUIVALENT TO:
  // init: function() {
  //   this.listenToMany(TransactionActions)
  //   // EQUIVALENT TO:
  //   // this.listenTo(TransactionActions.addTransaction, onAddTransaction);
  //   // this.listenTo(TransactionActions.updateTransaction, onUpdateTransaction);
  // },
  init() {
    this.listenTo(PeriodActions.selectPeriod, this.onSelectPeriod)
  },

  onSelectPeriod(period) {
    this.fetchTransactions(period);
  },

  fetchTransactions(period) {
    $.ajax({
      url: `/periods/${period.id}/transactions.json`,
      dataType: 'json',
      success: (data, code, err) => {
        this.transactions = {}
        data.forEach((transaction) => {
          this.transactions[transaction.id] = transaction;
        });
        // this.transactions = data;
        this.trigger(this.transactions);
      },
      error:(xhr, status, err) => {
        console.error('TransactionStore#fetchTransactions', status, err.toString());
      }
    })
  },

  getInitialState() {
    return {};
  },

  getTransaction(transaction_id) {
    // ES6: this.transactions.find(transaction => transaction.id == transaction_id);
    // return _.find(this.transactions, (transaction) => {
    //   return transaction.id == transaction_id
    // });
    return this.transactions[transaction_id];
  },

  getTransactions() {
    return _.sortByOrder(_.values(this.transactions), ['id'], [false]);
  },

  saveTransactionUrl(transaction) {
    if(transaction.hasOwnProperty('id')) {
      return `/periods/${transaction.period_id}/transactions/${transaction.id}.json`
    } else {
      return '/transactions.json'
    }
  },

  saveTransactionMethod(transaction) {
    if(transaction.hasOwnProperty('id')) {
      return 'PATCH'
    } else {
      return 'POST'
    }
  },

  onSaveTransaction(transaction) {
    $.ajax({
      url: this.saveTransactionUrl(transaction),
      method: this.saveTransactionMethod(transaction),
      beforeSend(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
      },
      data: {
        transaction: transaction
      },
      success: (data, status, err) => {
        this.transactions[data.id] = data;
        this.trigger(this.transactions);
      }
    })
  }
});

export default TransactionStore;
