'use strict';

import { formatTime, formatCents } from '../services/Formatters';
import React from 'react';
import Reflux from 'reflux';
import TransactionActions from '../actions/TransactionActions';
import TransactionFormActions from '../actions/TransactionFormActions';
import TransactionFormStore from '../stores/TransactionFormStore';
import AccountStore from '../stores/AccountStore';

var TransactionRow = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentDidMount() {
    this.listenTo(TransactionActions.selectTransaction, this.onSelectTransaction);
  },

  getInitialState() {
    return { rowClass: '' }
  },

  handleSelectTransaction() {
    TransactionActions.selectTransaction(this.props.transaction);
  },

  onSelectTransaction(transaction) {
    if(transaction.id == this.props.transaction.id) {
      this.setState({rowClass: 'highlight'})
    } else {
      this.setState({rowClass: ''})
    }
  },

  render() {
    /*console.log('TransactionRow', this.props, this.state);*/
    return (
      <tr className={this.state.rowClass} onClick={this.handleSelectTransaction}>
        <td>{AccountStore.getAccount(this.props.transaction.account_id).name}</td>
        <td>{this.props.transaction.description}</td>
        <td>{formatCents(this.props.transaction.amount)}</td>
        <td>{formatTime(this.props.transaction.created_at)}</td>
        <td>{this.props.transaction.id}</td>
      </tr>
    );
  }
});

export default TransactionRow;
