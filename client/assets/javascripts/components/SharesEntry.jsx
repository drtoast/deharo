'use strict';

import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import AccountStore from '../stores/AccountStore'
import TransactionFormStore from '../stores/TransactionFormStore'
import TransactionActions from '../actions/TransactionActions'
import TransactionFormActions from '../actions/TransactionFormActions'
import SharesEntryRow from './SharesEntryRow'

var SharesEntry = React.createClass({
  mixins: [Reflux.ListenerMixin, Reflux.connect(AccountStore, "accounts")],

  componentDidMount() {
    this.listenTo(TransactionActions.selectTransaction, this.onSelectTransaction);
  },

  getInitialState() {
    return { shares: {} }
  },

  onSelectTransaction(transaction) {
    this.setState({
      transaction: transaction,
      shares: _.cloneDeep(transaction.shares),
      cents: transaction.shares
    })
  },

  equalizePersonalShares(e) {
    e.preventDefault();
    TransactionFormActions.equalizePersonalShares();
  },

  equalizeBankShares(e) {
    e.preventDefault();
    TransactionFormActions.equalizeBankShares();
  },

  render() {
    var accounts = this.state.accounts.map((account) => {
      return (
        <SharesEntryRow disabled={this.props.disabled} account={account} shares={this.state.shares[account.id]} />
      );
    });

    return (
      <div className="sharesEntry">
        <div className="form-group">
          <label className="col-sm-6 control-label">Shares</label>
          <div className="col-sm-6">
            <a disabled={this.props.disabled} className="btn btn-default shares equalize" href="#" onClick={this.equalizePersonalShares}>Make Equal</a>
            <a disabled={this.props.disabled} className="btn btn-default shares pay-rent" href="#" onClick={this.equalizeBankShares}>Pay Bank</a>
          </div>
        </div>

        {{accounts}}
      </div>
    );
  }
});

export default SharesEntry;
