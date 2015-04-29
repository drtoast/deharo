'use strict';

import numeral from 'numeral';
import React from 'react';
import Reflux from 'reflux';
import TransactionFormStore from '../stores/TransactionFormStore';
import TransactionFormActions from '../actions/TransactionFormActions';

var SharesEntryRow = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentDidMount() {
    this.listenTo(TransactionFormStore, this.onSelectTransaction);
  },

  onSelectTransaction(transaction) {
    var shares = transaction.shares[this.props.account.id];
    var cents = transaction.cents[this.props.account.id] || 0;
    this.setState({shares: shares, cents: cents});
  },

  getInitialState() {
    return { shares: this.props.shares, cents: 0 }
  },

  handleSharesChange(e) {
    var shares = React.findDOMNode(this.refs.shares).value.trim();
    console.log(`handleShareChange: ${shares} shares for account ${this.props.account.id}`);
    TransactionFormActions.changeShares(this.props.account.id, shares);
  },

  render() {
    return (
      <div className="form-group">
        <label className="col-sm-2 control-label">{this.props.account.name}</label>
        <div className="col-sm-4">
          <input className="form-control share" ref="shares" type="text" value={this.state.shares} onChange={this.handleSharesChange}/>
          <span className="share-dollars">{numeral(this.state.cents / 100).format('$0,0.00')}</span>
        </div>
      </div>
    );
  }
});

export default SharesEntryRow;
