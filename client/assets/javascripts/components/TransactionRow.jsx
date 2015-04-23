'use strict';

import $ from 'jquery';
import React from 'react';

// Next line is necessary for exposing React to browser for
// the React Developer Tools: http://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html
// require("expose?React!react");

var TransactionRow = React.createClass({
  render() {
    return (
      <tr>
        <td>{this.props.account_id}</td>
        <td>{this.props.description}</td>
        <td>{this.props.amount}</td>
        <td>{this.props.created_at}</td>
        <td>{this.props.tid}</td>
      </tr>
    );
  }
});

export default TransactionRow;
