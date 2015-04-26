'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import TransactionActions from '../actions/TransactionActions'
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

  fetchTransactions() {
    $.ajax({
      url: '/periods/1/transactions.json',
      dataType: 'json',
      success: (data, code, err) => {
        this.transactions = data;
        this.trigger(this.transactions);
      },
      error:(xhr, status, err) => {
        console.error('TransactionStore#fetchTransactions', status, err.toString());
      }
    })
  },

  saveTransaction(transaction) {
    $.ajax({
      url: '/transactions.json',
      method: 'POST',
      beforeSend(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
      },
      data: {
        transaction: transaction
      },
      success: (data, status, err) => {
        this.transactions.unshift(data);
        this.trigger(this.transactions);
      }
    })
  },

  getInitialState() {
    this.transactions = [];
    this.fetchTransactions();
    // setInterval(this.fetchTransactions, 3600);
    return this.transactions;
  },

  getTransaction(transaction_id) {
    // ES6: this.transactions.find(transaction => transaction.id == transaction_id);
    return _.find(this.transactions, (transaction) => {
      return transaction.id == transaction_id
    });
  },

  onSelectTransaction(data) {
    console.log('selectTransaction', data);
  },

  onAddTransaction(data) {
    console.log('onAddTransaction', data);
    // this.transactions.push(data);
    this.saveTransaction(data);
    // this.trigger(this.transactions);
  },

  onUpdateTransaction(data) {
    console.log('onUpdateTransaction', data)
  }
});

export default TransactionStore;
