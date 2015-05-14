'use strict';

import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import PresetRow from './PresetRow';

var PresetList = React.createClass({

  render() {
    var presetRows = _.values(this.props.presets).map((preset) => {
      return (
        <PresetRow key={preset.id} preset={preset} />
      );
    });

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>purchaser</th>
            <th>description</th>
            <th>amount</th>
          </tr>
        </thead>
        <tbody>
          {{ presetRows }}
        </tbody>
      </table>
    );
  }
});

export default PresetList;
