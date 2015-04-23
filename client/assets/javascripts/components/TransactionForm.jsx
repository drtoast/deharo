'use strict';

import $ from 'jquery';
import React from 'react';
import Reflux from 'reflux';
import TransactionActions from '../actions/TransactionActions'
import AccountSelect from './AccountSelect'

// Next line is necessary for exposing React to browser for
// the React Developer Tools: http://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html
// require("expose?React!react");

var TransactionForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    var description = React.findDOMNode(this.refs.description).value.trim();
    var amount = parseInt(React.findDOMNode(this.refs.amount).value.trim()) * 100;
    TransactionActions.addTransaction({description: description, amount: amount, account_id: this.state.accountID, shares: { '1': 1 }});
  },

  handleAccountChange(accountID) {
    this.setState({accountID: accountID})
  },

  render() {
    return (
      <form id="transactions" className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label">Purchaser</label>
          <div className="col-sm-4">
            <AccountSelect onAccountChange={this.handleAccountChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Amount</label>
          <div className="col-sm-4">
            <input className="form-control" placeholder="Amount" ref="amount" type="text" autoFocus />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Description</label>
          <div className="col-sm-4">
            <input className="form-control" placeholder="Description" ref="description" type="text" />
          </div>
        </div>
        <hr />
        <div className="form-group">
          <label className="col-sm-2 control-label">Shares</label>
          <div className="col-sm-4">
            <a className="btn btn-default shares equalize" href="#">Make Equal</a>
            <a className="btn btn-default shares pay-rent" href="#">Pay Bank</a>
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">Jam</label>
          <div className="col-sm-4">
            <input className="form-control share" type="text" value="" />
            <span className="share-dollars" data-account-id="2">$0.00</span>
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-2"></div>
          <div className="col-sm-4">
            <button className="btn btn-primary btn-block" type="submit">Submit</button>
          </div>
        </div>
      </form>
    );
  }
});

export default TransactionForm;
