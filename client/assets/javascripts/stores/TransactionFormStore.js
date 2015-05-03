'use strict';

import _ from 'lodash';
import Reflux from 'reflux';
import React from 'react/addons';

// actions
import TransactionFormActions   from '../actions/TransactionFormActions'
import TransactionActions       from '../actions/TransactionActions'
import PresetActions            from '../actions/PresetActions'
import PeriodActions            from '../actions/PeriodActions'

// stores
import TransactionStore         from './TransactionStore'
import AccountStore             from './AccountStore'
import TransactionCalculator    from '../services/TransactionCalculator'


var TransactionFormStore = Reflux.createStore({
  mixins: [Reflux.ListenerMixin],
  listenables: TransactionFormActions,

  init() {
    this.initializeTransaction();
    this.listenTo(TransactionActions.selectTransaction, this.onSelectTransaction);
    this.listenTo(PresetActions.selectPreset, this.onSelectPreset);
    this.listenTo(PeriodActions.selectPeriod, this.onResetForm);
  },

  onSelectTransaction(transaction) {
    this.transaction = _.cloneDeep(transaction);
    this.calculateCents();
    this.trigger(this.transaction);
  },

  onSelectPreset(preset) {
    this.transaction = _.cloneDeep(preset);
    delete this.transaction.id;
    delete this.transaction.period_id;
    this.calculateCents();
    console.log('TransactionFormStore#onSelectPreset', this.transaction);
    this.trigger(this.transaction);
  },

  onChangeShares(accountID, shares) {
    this.transaction.shares[accountID] = shares;
    this.calculateCents();
    this.trigger(this.transaction);
  },

  onEqualizePersonalShares() {
    this.setSharesByType({personal: 1, corporate: 0});
    this.calculateCents();
    this.trigger(this.transaction);
  },

  onEqualizeBankShares() {
    this.setSharesByType({personal: 0, corporate: 1});
    this.calculateCents();
    this.trigger(this.transaction);
  },

  onChangeAmount(cents) {
    this.transaction.amount = cents;
    this.calculateCents();
    this.trigger(this.transaction);
  },

  onChangeAccount(accountID) {
    this.transaction.account_id = accountID;
    this.trigger(this.transaction);
  },

  onChangeDescription(description) {
    this.transaction.description = description;
    this.trigger(this.transaction);
  },

  onSubmitForm() {
    TransactionActions.saveTransaction(this.transaction);
  },

  onResetForm() {
    this.initializeTransaction();
    this.trigger(this.transaction);
  },

  calculateCents() {
    let calc = new TransactionCalculator(this.transaction);
    calc.update();
  },

  setSharesByType(values) {
    AccountStore.accounts.forEach((account) => {
      this.transaction.shares[account.id] = values[account.kind];
    });
  },

  initializeTransaction() {
    this.transaction = { accountID: '', amount: 0, description: '', shares: {}, cents: {} };
  }
});

export default TransactionFormStore;
