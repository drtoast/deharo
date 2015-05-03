'use strict';

import $ from 'jquery';
import React from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import BalanceList from './BalanceList';
import PeriodList from './PeriodList';
import PresetList from './PresetList';

var DeHaroApp = React.createClass({
  render() {
    return (
      <div className="deHaroApp row">
        <div className='col-md-6 col-sm-12'>
          <TransactionForm />
        </div>
        <div className='col-md-6 col-sm-12' role="tabpanel">
          <ul className="nav nav-tabs" role="tablist">
            <li role="presentation"><a href="#periods-panel" aria-controls="profile" role="tab" data-toggle="tab">Periods</a></li>
            <li role="presentation" className="active"><a href="#transactions-panel" aria-controls="home" role="tab" data-toggle="tab">Transactions</a></li>
            <li role="presentation"><a href="#balances-panel" aria-controls="profile" role="tab" data-toggle="tab">Balances</a></li>
            <li role="presentation"><a href="#presets-panel" aria-controls="profile" role="tab" data-toggle="tab">Presets</a></li>
          </ul>
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane" id="periods-panel">
              <PeriodList />
            </div>
            <div role="tabpanel" className="tab-pane active" id="transactions-panel">
              <TransactionList />
            </div>
            <div role="tabpanel" className="tab-pane" id="balances-panel">
              <BalanceList />
            </div>
            <div role="tabpanel" className="tab-pane" id="presets-panel">
              <PresetList />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default DeHaroApp;
