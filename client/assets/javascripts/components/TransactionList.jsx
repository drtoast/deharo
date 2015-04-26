'use strict';

import React from 'react';
import Reflux from 'reflux';
import TransactionStore from '../stores/TransactionStore';
import TransactionRow from './TransactionRow';

// Next line is necessary for exposing React to browser for
// the React Developer Tools: http://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html
// require("expose?React!react");

var TransactionList = React.createClass({
  /* TODO: filter by selected period (this.state.period):
    https://github.com/spoike/refluxjs#using-refluxconnectfilter */
  mixins: [Reflux.connect(TransactionStore,"transactions")],

  render() {
    var transactionRows = this.state.transactions.map(function (transaction) {
      return (
        <TransactionRow transaction={transaction} />
      );
    });

    return (
      <div className="transactionList">
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
      </div>
    );
  }
});

export default TransactionList;
