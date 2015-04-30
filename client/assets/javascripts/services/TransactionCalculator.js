'use strict';

import _ from 'lodash';

class TransactionCalculator {
  constructor(transaction) {
    this.transaction = transaction;
    this.update();
  }

  update() {
    this._calculateCents();
  }

  debitFor(accountID) {
    let totalShares = this._totalShares();
    let debit = 0;
    if(totalShares > 0) {
      debit = (this.transaction.amount * (this._sharesFor(accountID) / totalShares))
    }

    return debit;
  }

  creditFor(accountID) {
    let credit = 0;
    if(this.transaction.account_id == accountID) {
      credit = this.transaction.amount;
    }

    return credit;
  }

  _sharesFor(accountID) {
    return this.transaction.shares[accountID] || 0
  }

  _totalShares() {
    let totalShares = 0;
    _.forOwn(this.transaction.shares, (shares, accountID) => {
      totalShares += parseInt(shares);
    });
    return totalShares;
  }

  _calculateCents() {
    if(!this.transaction.hasOwnProperty('cents')) {
      this.transaction.cents = {};
    };

    let total = this._totalShares();

    _.forOwn(this.transaction.shares, (shares, accountID) => {
      let cents = (shares / total) * this.transaction.amount;
      this.transaction.cents[accountID] = cents;
    });
  }
}

export default TransactionCalculator;
