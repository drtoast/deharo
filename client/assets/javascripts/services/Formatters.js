'use strict';

import moment from 'moment';
import numeral from 'numeral';

export function formatTime(time) {
  if(typeof(time) == 'string') {
    return moment(time).format('YYYY-MM-DD h:mm:ss a')
  } else {
    return ''
  }
};

export function formatCents(cents) {
  return numeral((cents || 0) / 100).format('$0,0.00');
};
