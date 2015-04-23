'use strict';

import $ from 'jquery';
import React from 'react';
import Reflux from 'reflux';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import TransactionStore from '../stores/TransactionStore';

// Next line is necessary for exposing React to browser for
// the React Developer Tools: http://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html
// require("expose?React!react");

var TransactionView = React.createClass({
  render() {
    return (
      <div className="transactionView">
        <TransactionForm />
        <TransactionList />
      </div>
    );
  }
});

export default TransactionView;
