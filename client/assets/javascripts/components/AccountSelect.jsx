'use strict';

import React from 'react';
import Reflux from 'reflux';
import AccountStore from '../stores/AccountStore'

var AccountSelect = React.createClass({
  mixins: [Reflux.connect(AccountStore, "accounts")],

  handleChange(event) {
    var accountID = React.findDOMNode(this.refs.accountID).value
    this.props.onAccountChange(accountID);
  },

  render() {
    var accounts = this.state.accounts.map(function (account) {
      return (
        <option value={account.id}>{account.name}</option>
      );
    });

    return (
      <select className="form-control" ref="accountID" onChange={this.handleChange}>
        <option value="">Please select</option>
        {{accounts}}
      </select>
    );
  }
});

export default AccountSelect;
