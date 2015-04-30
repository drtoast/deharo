'use strict';

import _ from 'lodash';
import Reflux from 'reflux';
import PeriodActions from '../actions/PeriodActions'

var PeriodStore = Reflux.createStore({
  init() {
    this.fetchPeriods();
  },

  fetchPeriods() {
    $.ajax({
      url: '/periods.json',
      dataType: 'json',
      success: (data, code, err) => {
        this.periods = data;
        this.trigger(this.periods);
        this.selectOpenPeriod();
      },
      error:(xhr, status, err) => {
        console.error('PeriodStore#fetchAccounts', status, err.toString());
      }
    })
  },

  getPeriod(period_id) {
    return _.find(this.periods, (period) => {
      return period.id == period_id
    }) || {};
  },

  selectOpenPeriod() {
    let openPeriod = _.find(this.periods, (period) => {
      return period.status == 'open'
    });

    PeriodActions.selectPeriod(openPeriod);
  },

  getInitialState() {
    return [];
  }
});

export default PeriodStore;
