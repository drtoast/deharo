'use strict';

import $ from 'jquery';
import React from 'react';
import Reflux from 'reflux';
import numeral from 'numeral';
import TransactionStore from '../stores/TransactionStore';
import TransactionRow from './TransactionRow';

// Next line is necessary for exposing React to browser for
// the React Developer Tools: http://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html
// require("expose?React!react");

var TransactionList = React.createClass({
  mixins: [Reflux.connect(TransactionStore,"transactions")],

  render() {
    var transactionRows = this.state.transactions.map(function (data) {
      return (
        <TransactionRow
          account_id={data.account_id}
          description={data.description}
          amount={numeral(data.amount / 100).format('$0,0.00')}
          created_at={data.created_at}
          tid={data.id} />
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
