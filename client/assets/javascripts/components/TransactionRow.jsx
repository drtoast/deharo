'use strict';

import $ from 'jquery';
import numeral from 'numeral';
import React from 'react';
import Reflux from 'reflux';
import TransactionFormActions from '../actions/TransactionFormActions';
import TransactionFormStore from '../stores/TransactionFormStore';
import AccountStore from '../stores/AccountStore';

var TransactionRow = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentDidMount() {
    this.listenTo(TransactionFormStore, this.onSelectTransaction);
  },

  getInitialState() {
    return { rowClass: '' }
  },

  handleSelectTransaction() {
    TransactionFormActions.selectTransaction(this.props.transaction.id);
  },

  onSelectTransaction(transaction) {
    if(transaction.id == this.props.transaction.id) {
      this.setState({rowClass: 'highlight'})
    } else {
      this.setState({rowClass: ''})
    }
  },

  render() {
    console.log('TransactionRow', this.props, this.state);
    return (
      <tr className={this.state.rowClass} onClick={this.handleSelectTransaction}>
        <td>{AccountStore.getAccount(this.props.transaction.account_id).name}</td>
        <td>{this.props.transaction.description}</td>
        <td>{numeral(this.props.transaction.amount / 100).format('$0,0.00')}</td>
        <td>{this.props.transaction.created_at}</td>
        <td>{this.props.transaction.id}</td>
      </tr>
    );
  }
});

export default TransactionRow;
