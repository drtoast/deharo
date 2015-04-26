'use strict';

import $ from 'jquery';
import numeral from 'numeral';
import React from 'react';
import TransactionFormActions from '../actions/TransactionFormActions';

var TransactionRow = React.createClass({
  selectTransaction() {
    TransactionFormActions.selectTransaction(this.props.transaction.id);
  },

  render() {
    return (
      <tr className="transaction-row" onClick={this.selectTransaction}>
        <td>{this.props.transaction.account_id}</td>
        <td>{this.props.transaction.description}</td>
        <td>{numeral(this.props.transaction.amount / 100).format('$0,0.00')}</td>
        <td>{this.props.transaction.created_at}</td>
        <td>{this.props.transaction.id}</td>
      </tr>
    );
  }
});

export default TransactionRow;
