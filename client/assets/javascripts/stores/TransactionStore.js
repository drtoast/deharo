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

  getInitialState() {
    return {};
  },

  onSelectPeriod(period) {
    this.fetchTransactions(period);
  },


  // GET TRANSACTIONS

  getTransaction(transaction_id) {
    return this.transactions[transaction_id];
  },

  getTransactions() {
    return _.sortByOrder(_.values(this.transactions), ['id'], [false]);
  },


  // FETCH TRANSACTIONS

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
    this.trigger(this.transactions);
  },

  onFetchTransactionsFailed(xhr, status, error) {
    AlertActions.error(`Couldn't load transactions: ${err}`);
  },


  // SAVE TRANSACTION

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

  onSaveTransactionCompleted(data, status, xhr) {
    this.transactions[data.id] = data;
    AlertActions.success(`Transaction ${data.id} Saved`);
    this.trigger(this.transactions);
  },

  onSaveTransactionFailed(xhr, status, error) {
    let errors;
    if(xhr.hasOwnProperty('responseJSON')) {
      errors = xhr.responseJSON.errors.join(', ');
    } else {
      errors = `${xhr.statusText} (${xhr.status})`
    }

    AlertActions.error(`Couldn't save transaction: ${errors}`);
    this.trigger(this.transactions);
  },


  // DELETE TRANSACTION

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
  },

  _deleteTransactionUrl(transaction) {
    return `/transactions/${transaction.id}.json`
  },

});

export default TransactionStore;
