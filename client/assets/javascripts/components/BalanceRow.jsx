'use strict';

import { formatCents } from '../services/Formatters';
import React from 'react';
import Reflux from 'reflux';
import BalanceStore from '../stores/BalanceStore';

var BalanceRow = React.createClass({
  mixins: [Reflux.connect(BalanceStore,"balances")],

  /*getInitialState() {
    return { balances: {} }
  },*/

  render() {
    var balance = this.state.balances[this.props.account.id] || {
      opening: 0,
      debits: 0,
      credits: 0,
      current: 0,
      closing: 0
    };
    /*console.log("render balance", this.props.account.id, balance);*/

    return (
      <tr>
        <td>{this.props.account.name}</td>
        <td>{formatCents(balance.opening)}</td>
        <td>{formatCents(balance.debits)}</td>
        <td>{formatCents(balance.credits)}</td>
        <td>{formatCents(balance.current)}</td>
        <td>{formatCents(balance.closing)}</td>
      </tr>
    );
  }
});

export default BalanceRow;
