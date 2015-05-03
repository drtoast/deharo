'use strict';

import Reflux from 'reflux';
import TransactionStore from './TransactionStore';
import AccountStore from './AccountStore';
import PeriodStore from './PeriodStore';
import TransactionCalculator from '../services/TransactionCalculator';

var BalanceStore = Reflux.createStore({
  init() {
    this.balances = {};
    this.listenTo(TransactionStore, this.updateBalances);
  },

  _initializeBalances() {
    this.balances = {};

    AccountStore.accounts.forEach((account) => {
      this.balances[account.id] = {
        opening: 0,
        debits: 0,
        credits: 0,
        current: 0,
        closing: 0
      };
    })
  },

  updateBalances(transactions) {

    this._initializeBalances();
    let periodID;

    TransactionStore.getTransactions().forEach((transaction) => {
      let calc = new TransactionCalculator(transaction);
      periodID = transaction.period_id;

      this.balances[transaction.account_id].credits += calc.creditFor(transaction.account_id);

      _.forOwn(transaction.shares, (shares, accountID) => {
        this.balances[accountID].debits -= calc.debitFor(accountID);
      });
    });

    let period = PeriodStore.getPeriod(periodID);
    // console.log('updateBalances', transactions, periodID, period);

    AccountStore.accounts.forEach((account) => {
      let balances = this.balances[account.id];
      balances.opening = period.opening_balances[account.id] || 0;
      balances.closing = period.closing_balances[account.id] || 0;
      balances.current = balances.opening + balances.debits + balances.credits;
    });

    this.trigger(this.balances);
  },

  getInitialState() {
    return {}
  }
});

export default BalanceStore;
