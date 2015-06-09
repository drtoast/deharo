'use strict';

import { formatTime, formatCents } from '../services/Formatters'
import numeral from 'numeral'
import React from 'react'
import Reflux from 'reflux'

/* actions */
import TransactionActions from      '../actions/TransactionActions'
import PeriodActions from           '../actions/PeriodActions'
import TransactionFormActions from  '../actions/TransactionFormActions'
import PresetActions from           '../actions/PresetActions'

/* stores */
import PeriodStore from             '../stores/PeriodStore'
import TransactionFormStore from    '../stores/TransactionFormStore'

/* components */
import AccountSelect from           './AccountSelect'
import SharesEntry from             './SharesEntry'


var TransactionForm = React.createClass({
  mixins: [Reflux.ListenerMixin, Reflux.connect(TransactionFormStore,"transaction")],
  listenables: [TransactionActions],

  componentDidMount() {
    this.listenTo(TransactionActions.selectTransaction, this.onSelectTransaction);
    this.listenTo(TransactionActions.saveTransaction.completed, this.onSaveTransactionCompleted);
    this.listenTo(TransactionActions.saveTransaction.failed, this.onSaveTransactionFailed);
    this.listenTo(TransactionActions.deleteTransaction.completed, this.deleteTransactionSuccess);
    this.listenTo(TransactionActions.deleteTransaction.failed, this.onDeleteTransactionFailed);
    this.listenTo(PresetActions.selectPreset, this.onSelectPreset);
    this.listenTo(PeriodActions.selectPeriod, this.onSelectPeriod);
  },

  getInitialState() {
    return {
      transaction: {},
      amountDollars: '',
      description: '',
      disabled: false,
    }
  },

  onSelectTransaction(transaction) {
    var period = PeriodStore.getPeriod(transaction.period_id);
    var disabled;

    if (typeof(transaction.id) == 'number' && period.status == 'closed') {
      disabled = true;
    } else {
      disabled = false;
    }

    this.setState({
      description: transaction.description,
      amountDollars: formatCents(transaction.amount),
      disabled: disabled
    });
  },

  onSelectPeriod(period) {
    this.setState(this.getInitialState());
  },

  onSelectPreset(preset) {
    console.log('TransactionForm#onSelectPreset', preset);
    this.setState({
      description: preset.description,
      amountDollars: formatCents(preset.amount),
      disabled: false
    })
  },

  handleSubmit(e) {
    e.preventDefault();
    this.setState({disabled: true});
    TransactionFormActions.submitForm();
  },

  handleDelete(e) {
    e.preventDefault();
    TransactionFormActions.deleteTransaction();
  },

  handleReset(e) {
    e && e.preventDefault();
    this.setState(this.getInitialState());
    TransactionFormActions.resetForm();
  },

  handleDescriptionChange(e) {
    var description = React.findDOMNode(this.refs.description).value;
    this.setState({description: description});
    TransactionFormActions.changeDescription(description);
  },

  handleAmountChange(e) {
    var dollars = React.findDOMNode(this.refs.amountDollars).value.trim()
    var cents = numeral().unformat(dollars) * 100;
    this.setState({amountDollars: dollars});
    TransactionFormActions.changeAmount(cents);
  },

  onSaveTransactionCompleted(transaction) {
    this.setState({disabled: false});
  },

  onSaveTransactionFailed(xhr, status, error) {
    this.setState({disabled: false});
  },

  onDeleteTransactionCompleted(transaction) {
    this.setState({disabled: false});
  },

  onDeleteTransactionFailed(transaction, error) {
    this.setState({disabled: false});
  },

  render() {
    console.log('TransactionForm#render', this.state)
    var submitButtonLabel, submitButtonClass, deleteButton;
    if(typeof(this.state.transaction.id) == 'number') {
      submitButtonLabel = 'Update';
      submitButtonClass = "btn btn-block btn-warning"
      deleteButton = <a disabled={this.state.disabled} className="btn btn-block btn-danger" href="#" onClick={this.handleDelete}>Delete</a>
    } else {
      submitButtonLabel = 'Create';
      submitButtonClass = "btn btn-block btn-primary"
    };

    return (
      <form id="transactions-react" className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="col-sm-4 control-label">Purchaser</label>
          <div className="col-sm-8">
            <AccountSelect disabled={this.state.disabled}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Amount</label>
          <div className="col-sm-8">
            <input disabled={this.state.disabled} className="form-control" onChange={this.handleAmountChange} value={this.state.amountDollars} placeholder="Amount" ref="amountDollars" type="text" />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Description</label>
          <div className="col-sm-8">
            <input disabled={this.state.disabled} className="form-control" onChange={this.handleDescriptionChange} value={this.state.description} placeholder="Description" ref="description" type="text" />
          </div>
        </div>
        <hr />

        <SharesEntry disabled={this.state.disabled} />

        <div className="form-group">
          <div className="col-sm-4"></div>
          <div className="col-sm-8">
            <button disabled={this.state.disabled} className={submitButtonClass} type="submit">{submitButtonLabel}</button>
            {deleteButton}
            <a className="btn btn-block btn-default" href="#" onClick={this.handleReset}>Clear</a>
          </div>
        </div>
      </form>
    );
  }
});

export default TransactionForm;
