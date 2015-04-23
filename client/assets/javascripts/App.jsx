'use strict';

import $ from 'jquery';
import React from 'react';
import DeHaroApp from './components/DeHaroApp';

$(function() {
  function render() {
    if ($('#react-app').length > 0) {
      React.render(
        <DeHaroApp />,
        document.getElementById('react-app')
      );
    }
  }

  render();
});
