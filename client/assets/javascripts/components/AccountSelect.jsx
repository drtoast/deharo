'use strict';

import React from 'react';
import Reflux from 'reflux';
import AccountStore from '../stores/AccountStore'
import TransactionFormStore from '../stores/TransactionFormStore'

var AccountSelect = React.createClass({
  mixins: [Reflux.ListenerMixin, Reflux.connect(AccountStore, "accounts")],

  componentDidMount() {
    this.listenTo(TransactionFormStore, this.onSelectTransaction);
  },

  onSelectTransaction(transaction) {
    this.state.accountID = transaction.account_id
  },

  getInitialState() {
    return { accountID: '' }
  },

  handleChange(event) {
    var accountID = React.findDOMNode(this.refs.accountID).value
    this.state.accountID = accountID;
    this.props.onAccountChange(accountID);
  },

  render() {
    var accounts = this.state.accounts.map(function (account) {
      return (
        <option value={account.id}>{account.name}</option>
      );
    });

    return (
      <select className="form-control" ref="accountID" value={this.state.accountID} onChange={this.handleChange}>
        <option value="">Please select</option>
        {{accounts}}
      </select>
    );
  }
});

export default AccountSelect;
