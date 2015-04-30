'use strict';

import numeral from 'numeral';
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
    console.log("render balance", this.props.account.id, balance);

    return (
      <tr>
        <td>{this.props.account.name}</td>
        <td>{numeral(balance.opening / 100).format('$0,0.00')}</td>
        <td>{numeral(balance.debits / 100).format('$0,0.00')}</td>
        <td>{numeral(balance.credits / 100).format('$0,0.00')}</td>
        <td>{numeral(balance.current / 100).format('$0,0.00')}</td>
        <td>{numeral(balance.closing / 100).format('$0,0.00')}</td>
      </tr>
    );
  }
});

export default BalanceRow;
