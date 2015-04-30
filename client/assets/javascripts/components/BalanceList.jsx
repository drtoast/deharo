'use strict';

import React from 'react';
import Reflux from 'reflux';
import AccountStore from '../stores/AccountStore';
import BalanceRow from './BalanceRow';

var BalanceList = React.createClass({
  mixins: [Reflux.connect(AccountStore,"accounts")],

  getInitialState() {
    return { balances: [] }
  },

  render() {
    var balanceRows = this.state.accounts.map((account) => {
      return (
        <BalanceRow key={account.id} account={account} />
      );
    });

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>account</th>
            <th>opening</th>
            <th>debits</th>
            <th>credits</th>
            <th>current</th>
            <th>closing</th>
          </tr>
        </thead>
        <tbody>
          {{ balanceRows }}
        </tbody>
      </table>
    );
  }
});

export default BalanceList;
