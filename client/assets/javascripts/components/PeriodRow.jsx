'use strict';

import React from 'react';
import Reflux from 'reflux';
import PeriodActions from '../actions/PeriodActions';
import PeriodStore from '../stores/PeriodStore';

var PeriodRow = React.createClass({
  mixins: [Reflux.connect(PeriodStore,"periods")],

  componentDidMount() {
    this.listenTo(PeriodActions.selectPeriod, this.onSelectPeriod);
  },

  getInitialState() {
    return { rowClass: '' }
  },

  handleSelectPeriod() {
    PeriodActions.selectPeriod(this.props.period);
  },

  onSelectPeriod(period) {
    console.log(`PeriodRow#onSelectPeriod`, period);
    if(period.id == this.props.period.id) {
      this.setState({rowClass: 'highlight'})
    } else {
      this.setState({rowClass: ''})
    }
  },

  render() {
    return (
      <tr className={this.state.rowClass} onClick={this.handleSelectPeriod}>
        <td>{this.props.period.id}</td>
        <td>{this.props.period.status}</td>
        <td>{this.props.period.opened_at}</td>
        <td>{this.props.period.closed_at}</td>
      </tr>
    );
  }
});

export default PeriodRow;
