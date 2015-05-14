'use strict';

import React from 'react';

var Alert = React.createClass({

  render() {
    let style = {};
    let className = `alert alert-${this.props.alert.level}`;

    if(this.props.alert.visible) {
      style.display = 'block';
    } else {
      style.display = 'none';
    };

    return (
      <div className={className} style={style} role="alert">
        {this.props.alert.message}
      </div>
    );
  }
});

export default Alert;
