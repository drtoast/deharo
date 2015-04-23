'use strict';

import $ from 'jquery';
import React from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

var DeHaroApp = React.createClass({
  render() {
    return (
      <div className="deHaroApp">
        <TransactionForm />
        <TransactionList />
      </div>
    );
  }
});

export default DeHaroApp;
