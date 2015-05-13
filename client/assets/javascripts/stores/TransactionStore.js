'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import TransactionActions from '../actions/TransactionActions'
import PeriodActions from '../actions/PeriodActions';
import TransactionFormActions from '../actions/TransactionFormActions';
import AlertActions from '../actions/AlertActions';

import _ from 'lodash';

var TransactionStore = Reflux.createStore({
  listenables: TransactionActions,

  init() {
    this.listenTo(PeriodActions.selectPeriod, this.onSelectPeriod)
  },

  onSelectPeriod(period) {
    this.fetchTransactions(period);
  },

  fetchTransactions(period) {
    $.ajax({
      url: `/periods/${period.id}/transactions.json`,
      dataType: 'json'
    })
    .done(TransactionActions.fetchTransactions.completed)
    .fail(TransactionActions.fetchTransactions.failed)
  },

  onFetchTransactionsCompleted(data, status, xhr) {
    this.transactions = {}
    data.forEach((transaction) => {
      this.transactions[transaction.id] = transaction;
    });
    AlertActions.success(`Loaded transactions`);
    this.trigger(this.transactions);
  },

  onFetchTransactionsFailed(xhr, status, error) {
    AlertActions.error(`Couldn't load transactions: ${err}`);
  },

  getInitialState() {
    return {};
  },

  getTransaction(transaction_id) {
    return this.transactions[transaction_id];
  },

  getTransactions() {
    return _.sortByOrder(_.values(this.transactions), ['id'], [false]);
  },

  _saveTransactionUrl(transaction) {
    if(transaction.hasOwnProperty('id')) {
      return `/periods/${transaction.period_id}/transactions/${transaction.id}.json`
    } else {
      return '/transactions.json'
    }
  },

  _saveTransactionMethod(transaction) {
    if(transaction.hasOwnProperty('id')) {
      return 'PATCH'
    } else {
      return 'POST'
    }
  },

  _deleteTransactionUrl(transaction) {
    return `/transactions/${transaction.id}.json`
  },

  onSaveTransaction(transaction) {
    $.ajax({
      url: this._saveTransactionUrl(transaction),
      method: this._saveTransactionMethod(transaction),
      beforeSend(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
      },
      data: {
        transaction: transaction
      }
    })
    .done(TransactionActions.saveTransaction.completed)
    .fail(TransactionActions.saveTransaction.failed)
  },

  onSaveTransactionCompleted(data, status, xhr) {
    this.transactions[data.id] = data;
    AlertActions.success(`Transaction ${data.id} Saved`);
    this.trigger(this.transactions);
  },

  onSaveTransactionFailed(xhr, status, error) {
    let errors = xhr.responseJSON.errors.join(', ');
    AlertActions.error(`Couldn't save transaction: ${errors}`);
    this.trigger(this.transactions);
  },

  onDeleteTransaction(transaction) {
    $.ajax({
      url: this._deleteTransactionUrl(transaction),
      method: 'DELETE',
      beforeSend(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
      }
    }).then(
      TransactionActions.deleteTransaction.completed,
      TransactionActions.deleteTransaction.failed
    )
  },

  onDeleteTransactionCompleted(data, status, xhr) {
    AlertActions.success(`Transaction ${data.id} Deleted`);
    delete this.transactions[data.id];
    this.trigger(this.transactions);
  }
});

export default TransactionStore;
