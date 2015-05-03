'use strict';

import React from 'react';
import Reflux from 'reflux';
import AccountStore from '../stores/AccountStore'
import TransactionFormStore from '../stores/TransactionFormStore'
import TransactionFormActions from '../actions/TransactionFormActions'

var AccountSelect = React.createClass({
  mixins: [Reflux.ListenerMixin, Reflux.connect(AccountStore, "accounts")],

  componentDidMount() {
    this.listenTo(TransactionFormStore, this.onSelectTransaction);
    this.listenTo(TransactionFormActions.resetForm, this.onResetForm);
  },

  onSelectTransaction(transaction) {
    this.setState({accountID: transaction.account_id});
  },

  onResetForm() {
    this.setState({accountID: ''});
  },

  getInitialState() {
    return { accountID: '' }
  },

  handleAccountChange(event) {
    var accountID = React.findDOMNode(this.refs.accountID).value
    TransactionFormActions.changeAccount(accountID);
  },

  render() {
    var accounts = this.state.accounts.map(function (account) {
      return (
        <option key={account.id} value={account.id}>{account.name}</option>
      );
    });

    return (
      <select disabled={this.props.disabled} className="form-control" ref="accountID" value={this.state.accountID} onChange={this.handleAccountChange}>
        <option value="">Please select</option>
        {{accounts}}
      </select>
    );
  }
});

export default AccountSelect;
