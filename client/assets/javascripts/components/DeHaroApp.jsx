'use strict';

import $ from 'jquery';
import React from 'react';
import Reflux from 'reflux';

// components
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import BalanceList from './BalanceList';
import PeriodList from './PeriodList';
import PresetList from './PresetList';
import Alert from './Alert';

// stores
import AlertStore from '../stores/AlertStore';
import PresetStore from '../stores/PresetStore';
import AccountStore from '../stores/AccountStore';
import TransactionStore from '../stores/TransactionStore';
import PeriodStore from '../stores/PeriodStore';

var DeHaroApp = React.createClass({
  mixins: [
    Reflux.connect(AlertStore, "alert"),
    Reflux.connect(PresetStore, "presets"),
    Reflux.connect(AccountStore, "accounts"),
    Reflux.connect(TransactionStore, "transactions"),
    Reflux.connect(PeriodStore, "periods")
  ],

  render() {
    return (
      <div className="deHaroApp row">
        <Alert alert={this.state.alert} />

        <div className='col-md-5 col-sm-12'>
          <TransactionForm />
        </div>

        <div className='col-md-7 col-sm-12' role="tabpanel">
          <ul className="nav nav-tabs" role="tablist">
            <li role="presentation"><a href="#periods-panel" aria-controls="profile" role="tab" data-toggle="tab">Periods</a></li>
            <li role="presentation" className="active"><a href="#transactions-panel" aria-controls="home" role="tab" data-toggle="tab">Transactions</a></li>
            <li role="presentation"><a href="#balances-panel" aria-controls="profile" role="tab" data-toggle="tab">Balances</a></li>
            <li role="presentation"><a href="#presets-panel" aria-controls="profile" role="tab" data-toggle="tab">Presets</a></li>
          </ul>

          <div className="tab-content">
            <div role="tabpanel" className="tab-pane" id="periods-panel">
              <PeriodList periods={this.state.periods} />
            </div>

            <div role="tabpanel" className="tab-pane active" id="transactions-panel">
              <TransactionList transactions={this.state.transactions} />
            </div>

            <div role="tabpanel" className="tab-pane" id="balances-panel">
              <BalanceList accounts={this.state.accounts} />
            </div>

            <div role="tabpanel" className="tab-pane" id="presets-panel">
              <PresetList presets={this.state.presets} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default DeHaroApp;
