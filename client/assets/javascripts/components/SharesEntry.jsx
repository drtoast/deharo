'use strict';

import React from 'react';
import Reflux from 'reflux';
import AccountStore from '../stores/AccountStore'
import TransactionFormStore from '../stores/TransactionFormStore'

var SharesEntry = React.createClass({
  mixins: [Reflux.ListenerMixin, Reflux.connect(AccountStore, "accounts")],

  componentDidMount() {
    this.listenTo(TransactionFormStore, this.onSelectTransaction);
  },

  getInitialState() {
    return { shares: {} }
  },

  onSelectTransaction(transaction) {
    console.log('onSelectTransaction', transaction.shares)
    this.setState({shares: transaction.shares})
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
        <div className="form-group">
          <label className="col-sm-2 control-label">{account.name}</label>
          <div className="col-sm-4">
            <input className="form-control share" type="text" value={this.state.shares[account.id]} />
            <span className="share-dollars" data-account-id={account.id}>$0.00</span>
          </div>
        </div>
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
