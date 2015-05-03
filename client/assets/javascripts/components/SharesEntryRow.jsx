'use strict';

import numeral from 'numeral';
import React from 'react';
import Reflux from 'reflux';
import TransactionFormStore from '../stores/TransactionFormStore';
import TransactionActions from '../actions/TransactionActions';
import TransactionFormActions from '../actions/TransactionFormActions';

var SharesEntryRow = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentDidMount() {
    this.listenTo(TransactionActions.selectTransaction, this.onSelectTransaction);
    this.listenTo(TransactionFormStore, this.onSelectTransaction);
  },

  onSelectTransaction(transaction) {
    /*console.log('SharesEntryRow#onSelectTransaction', transaction, this.props.account.id)*/
    var shares = transaction.shares[this.props.account.id] || 0;
    var cents = transaction.cents[this.props.account.id] || 0;
    this.setState({shares: shares, cents: cents});
  },

  getInitialState() {
    return { shares: 0, cents: 0 }
  },

  handleSharesChange(e) {
    var shares = React.findDOMNode(this.refs.shares).value.trim();
    TransactionFormActions.changeShares(this.props.account.id, shares);
  },

  render() {
    /*console.log('SharesEntryRow#render', this.state, this.props);*/
    return (
      <div className="form-group">
        <label className="col-sm-6 control-label">{this.props.account.name}</label>
        <div className="col-sm-6">
          <input disabled={this.props.disabled} className="form-control share" ref="shares" type="text" value={this.state.shares} onChange={this.handleSharesChange}/>
          <span className="share-dollars">{numeral(this.state.cents / 100).format('$0,0.00')}</span>
        </div>
      </div>
    );
  }
});

export default SharesEntryRow;
