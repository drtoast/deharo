/** @jsx React.DOM **/

var Transaction = React.createClass({
  render: function () {
    console.log(this.props);
    return (
      <tr>
        <td>{this.props.data.account.name}</td>
        <td>{this.props.data.description}</td>
        <td>{this.props.data.amount}</td>
        <td>{this.props.data.created_at}</td>
        <td>{this.props.data.id}</td>
      </tr>
    );
  }
});
