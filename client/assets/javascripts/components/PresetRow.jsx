'use strict';

import { formatCents } from '../services/Formatters';
import React from 'react';
import Reflux from 'reflux';
import PresetActions from '../actions/PresetActions';
import AccountStore from '../stores/AccountStore';
/*import TransactionFormActions from '../actions/TransactionFormActions';
import TransactionFormStore from '../stores/TransactionFormStore';*/

var PresetRow = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentDidMount() {
    this.listenTo(PresetActions.selectPreset, this.onSelectPreset);
  },

  getInitialState() {
    return { rowClass: '' }
  },

  handleSelectPreset() {
    PresetActions.selectPreset(this.props.preset);
  },

  onSelectPreset(preset) {
    if(preset.id == this.props.preset.id) {
      this.setState({rowClass: 'highlight'})
    } else {
      this.setState({rowClass: ''})
    }
  },

  render() {
    /*console.log('PresetRow#render', this.props, this.state);*/
    return (
      <tr className={this.state.rowClass} onClick={this.handleSelectPreset}>
        <td>{AccountStore.getAccount(this.props.preset.account_id).name}</td>
        <td>{this.props.preset.description}</td>
        <td>{formatCents(this.props.preset.amount)}</td>
      </tr>
    );
  }
});

export default PresetRow;
