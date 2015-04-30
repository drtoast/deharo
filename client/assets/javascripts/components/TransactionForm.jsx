'use strict';

import $ from 'jquery';
import numeral from 'numeral'
import React from 'react';
import Reflux from 'reflux';
import TransactionActions from '../actions/TransactionActions'
import PeriodActions from '../actions/PeriodActions'
import PeriodStore from '../stores/PeriodStore'
import TransactionFormStore from '../stores/TransactionFormStore'
import TransactionFormActions from '../actions/TransactionFormActions'
import AccountSelect from './AccountSelect'
import SharesEntry from './SharesEntry'

var TransactionForm = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentDidMount() {
    this.listenTo(TransactionFormStore, this.onSelectTransaction);
    this.listenTo(PeriodActions.selectPeriod, this.onSelectPeriod);
  },

  getInitialState() {
    return {
      transaction: {
        amount: 0,
        description: '',
        accountID: '',
        transactionID: null,
        shares: {},
        cents: {}
      }
    }
  },

  onSelectTransaction(transaction) {
    var period = PeriodStore.getPeriod(transaction.period_id);
    var disabled;

    if(period.status == 'closed') {
      disabled = true;
    } else {
      disabled = false;
    }
    this.setState({transaction: transaction, disabled: disabled});
  },

  onSelectPeriod(period) {
    TransactionFormActions.resetForm();
  },

  handleSubmit(e) {
    e.preventDefault();
    TransactionFormActions.submitForm();
  },

  handleReset(e) {
    e.preventDefault();
    TransactionFormActions.resetForm();
  },

  handleAccountChange(accountID) {
    this.setState({accountID: accountID})
  },

  handleDescriptionChange(e) {
    var description = React.findDOMNode(this.refs.description).value;
    /*this.setState({description: description})*/
    TransactionFormActions.changeDescription(description);
  },

  handleAmountChange(e) {
    var dollars = React.findDOMNode(this.refs.amount).value.trim()
    var cents = numeral().unformat(dollars) * 100;
    TransactionFormActions.changeAmount(cents);
  },

  render() {
    var submitButtonLabel, submitButtonClass;
    if(this.state.transaction.hasOwnProperty('id')) {
      submitButtonLabel = 'Update';
      submitButtonClass = "btn btn-warning"
    } else {
      submitButtonLabel = 'Create';
      submitButtonClass = "btn btn-primary"
    };

    return (
      <form id="transactions-react" className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="col-sm-6 control-label">Purchaser</label>
          <div className="col-sm-6">
            <AccountSelect disabled={this.state.disabled}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-6 control-label">Amount</label>
          <div className="col-sm-6">
            <input disabled={this.state.disabled} className="form-control" onChange={this.handleAmountChange} value={numeral(this.state.transaction.amount / 100).format('$0,0.00')} placeholder="Amount" ref="amount" type="text" />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-6 control-label">Description</label>
          <div className="col-sm-6">
            <input disabled={this.state.disabled} className="form-control" onChange={this.handleDescriptionChange} value={this.state.transaction.description} placeholder="Description" ref="description" type="text" />
          </div>
        </div>
        <hr />

        <SharesEntry disabled={this.state.disabled} />

        <div className="form-group">
          <div className="col-sm-6"></div>
          <div className="col-sm-6">
            <button disabled={this.state.disabled} className={submitButtonClass} type="submit">{submitButtonLabel}</button>
            <a className="btn btn-default" href="#" onClick={this.handleReset}>Reset</a>
          </div>
        </div>
      </form>
    );
  }
});

export default TransactionForm;
