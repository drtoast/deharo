'use strict';

import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import AccountStore from '../stores/AccountStore'
import TransactionFormStore from '../stores/TransactionFormStore'
import SharesEntryRow from './SharesEntryRow'

var SharesEntry = React.createClass({
  mixins: [Reflux.ListenerMixin, Reflux.connect(AccountStore, "accounts")],

  componentDidMount() {
    this.listenTo(TransactionFormStore, this.onSelectTransaction);
  },

  getInitialState() {
    return { shares: {} }
  },

  onSelectTransaction(transaction) {
    let shares = {}
    _.extend(shares, transaction.shares);
    console.log(`SharesEntry: ${JSON.stringify(transaction.shares)} => ${JSON.stringify(shares)}`)
    this.setState({shares: shares})
  },

  /*handleChange(event) {
    var accountID = React.findDOMNode(this.refs.accountID).value
    this.props.onAccountChange(accountID);
  },*/

  makeEqual(e) {
    e.preventDefault();
    console.log("make equal");
  },

  payBank(e) {
    e.preventDefault();
    console.log("pay bank");
  },

  render() {
    var accounts = this.state.accounts.map((account) => {
      return (
        <SharesEntryRow account={account} shares={this.state.shares[account.id]} />
      );
    });

    return (
      <div className="sharesEntry">
        <div className="form-group">
          <label className="col-sm-2 control-label">Shares</label>
          <div className="col-sm-4">
            <a className="btn btn-default shares equalize" href="#" onClick={this.makeEqual}>Make Equal</a>
            <a className="btn btn-default shares pay-rent" href="#" onClick={this.payBank}>Pay Bank</a>
          </div>
        </div>

        {{accounts}}
      </div>
    );
  }
});

export default SharesEntry;
