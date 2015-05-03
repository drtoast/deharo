'use strict';

import _ from 'lodash';
import Reflux from 'reflux';

var PresetStore = Reflux.createStore({
  init() {
    this.fetchPresets();
  },

  fetchPresets() {
    $.ajax({
      url: '/transaction_presets.json',
      dataType: 'json',
      success: (data, code, err) => {
        this.presets = {}
        data.forEach((preset) => {
          this.presets[preset.id] = preset;
        });
        this.trigger(this.presets);
      },
      error:(xhr, status, err) => {
        console.error('PresetStore#fetchPresets', status, err.toString());
      }
    })
  },

  getInitialState() {
    return {};
  }
});

export default PresetStore;
