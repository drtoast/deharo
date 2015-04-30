'use strict';

import _ from 'lodash';
import Reflux from 'reflux';
import AccountActions from '../actions/AccountActions'

var AccountStore = Reflux.createStore({
  listenables: AccountActions,

  init() {
    // this.accounts = [];
    this.fetchAccounts();
  },

  fetchAccounts() {
    $.ajax({
      url: '/accounts.json',
      dataType: 'json',
      success: (data, code, err) => {
        this.accounts = data;
        this.trigger(this.accounts);
      },
      error:(xhr, status, err) => {
        console.error('AccountStore#fetchAccounts', status, err.toString());
      }
    })
  },

  getAccount(account_id) {
    // ES6: this.transactions.find(transaction => transaction.id == transaction_id);
    return _.find(this.accounts, (account) => {
      return account.id == account_id
    }) || {};
  },

  getInitialState() {
    return []
  }
});

export default AccountStore;
