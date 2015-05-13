'use strict';

import React from 'react';
import Reflux from 'reflux';
import AlertStore from '../stores/AlertStore';
/*import AlertActions from '../actions/AlertActions';*/

var Alert = React.createClass({
  mixins: [Reflux.ListenerMixin, Reflux.connect(AlertStore,"alert")],

  getInitialState() {
    return { alert: { level: 'success', message: '', visible: false } };
  },

  /*componentDidUpdate(prevProps, prevState) {
    if(prevState.alert.visible != false) {
      console.log('dismiss');
      setTimeout(() => {
        this.setState({visible: false})
      }, 1000)
    }
  },*/

  render() {
    console.log('Alert#render', this.state);

    let style = {};
    let className = `alert alert-${this.state.alert.level}`;

    if(this.state.alert.visible) {
      style.display = 'block';
    } else {
      style.display = 'none';
    };

    return (
      <div className={className} style={style} role="alert">
        {this.state.alert.message}
      </div>
    );
  }
});

export default Alert;
