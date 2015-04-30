'use strict';

import React from 'react';
import Reflux from 'reflux';
import PeriodStore from '../stores/PeriodStore';
import PeriodRow from './PeriodRow';

var PeriodList = React.createClass({
  mixins: [Reflux.connect(PeriodStore,"periods")],

  render() {
    var periodRows = this.state.periods.map((period) => {
      console.log('period', period);
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
