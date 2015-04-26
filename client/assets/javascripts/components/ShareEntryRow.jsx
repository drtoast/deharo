'use strict';

import numeral from 'numeral';
import React from 'react';
import TransactionFormActions from '../actions/TransactionFormActions';

var ShareEntryRow = React.createClass({
  render() {
    return (
      <div className="form-group">
        <label className="col-sm-2 control-label">{this.state.name}</label>
        <div className="col-sm-4">
          <input className="form-control share" type="text" value={this.state.shares} />
          <span className="share-dollars" data-account-id={account.id}>$0.00</span>
        </div>
      </div>
    );
  }
});

export default ShareEntryRow;
