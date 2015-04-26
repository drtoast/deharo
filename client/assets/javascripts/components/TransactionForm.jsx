'use strict';

import $ from 'jquery';
import numeral from 'numeral'
import React from 'react';
import Reflux from 'reflux';
import TransactionActions from '../actions/TransactionActions'
import TransactionFormStore from '../stores/TransactionFormStore'
import AccountSelect from './AccountSelect'
import SharesEntry from './SharesEntry'

var TransactionForm = React.createClass({
  /*mixins: [Reflux.connect(TransactionFormStore,"transaction")],*/
  mixins: [Reflux.ListenerMixin],

  componentDidMount() {
    this.listenTo(TransactionFormStore, this.onSelectTransaction);
  },

  getInitialState() {
    return { amount: 0, description: '', accountID: '' }
  },

  onSelectTransaction(transaction) {
    this.setState({
      amount: transaction.amount,
      description: transaction.description,
      accountID: transaction.account_id
    });
  },

  handleSubmit(e) {
    e.preventDefault();
    TransactionActions.addTransaction({
      description: this.state.description,
      amount: this.state.amount,
      account_id: this.state.accountID,
      shares: { '1': 1 }
    });
  },

  handleAccountChange(accountID) {
    this.setState({accountID: accountID})
  },

  handleDescriptionChange(e) {
    var description = React.findDOMNode(this.refs.description).value.trim();
    this.setState({description: description})
  },

  handleAmountChange(e) {
    var dollars = React.findDOMNode(this.refs.amount).value.trim()
    var cents = numeral().unformat(dollars) * 100;
    this.setState({amount: cents})
  },

  render() {
    return (
      <form id="transactions-react" className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label">Purchaser</label>
          <div className="col-sm-4">
            <AccountSelect onAccountChange={this.handleAccountChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Amount</label>
          <div className="col-sm-4">
            <input className="form-control" onChange={this.handleAmountChange} value={numeral(this.state.amount / 100).format('$0,0.00')} placeholder="Amount" ref="amount" type="text" />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Description</label>
          <div className="col-sm-4">
            <input className="form-control" onChange={this.handleDescriptionChange} value={this.state.description} placeholder="Description" ref="description" type="text" />
          </div>
        </div>
        <hr />

        <SharesEntry />

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
