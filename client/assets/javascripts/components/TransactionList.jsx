'use strict';

import React from 'react';
import Reflux from 'reflux';
import TransactionRow from './TransactionRow';
import _ from 'lodash';

var TransactionList = React.createClass({

  render() {
    let sorted = _.sortByOrder(_.values(this.props.transactions), ['id'], [false]);
    var transactionRows = sorted.map((transaction) => {
        return (
          <TransactionRow key={transaction.id} transaction={transaction} />
        );
      }
    );

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>purchaser</th>
            <th>description</th>
            <th>amount</th>
            <th>created</th>
            <th>id</th>
          </tr>
        </thead>
        <tbody>
          {{ transactionRows }}
        </tbody>
      </table>
    );
  }
});

export default TransactionList;
