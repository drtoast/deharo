'use strict';

import React from 'react';
import PeriodRow from './PeriodRow';

var PeriodList = React.createClass({
  render() {
    var periodRows = this.props.periods.map((period) => {
      return (
        <PeriodRow key={period.id} period={period} />
      );
    });

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>status</th>
            <th>opened</th>
            <th>closed</th>
          </tr>
        </thead>
        <tbody>
          {{ periodRows }}
        </tbody>
      </table>
    );
  }
});

export default PeriodList;
