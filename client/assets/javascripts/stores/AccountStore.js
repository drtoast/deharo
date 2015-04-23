'use strict';

import Reflux from 'reflux';
import AccountActions from '../actions/AccountActions'

var AccountStore = Reflux.createStore({
  listenables: AccountActions,

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

  getInitialState() {
    this.accounts = [];
    this.fetchAccounts();
    // setInterval(this.fetchAccounts, 3600);
    return this.accounts;
  }
});

export default AccountStore;
