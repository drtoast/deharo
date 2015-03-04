/** @jsx React.DOM **/

var Period = React.createClass({
  render: function () {
    var transactionRows = this.props.transactions.map(function(transaction, index) {
      return (
        <TransactionRow data={transaction} />
      )
    }.bind(this));

    return (
      <div className="period">
        <h3>Period {this.props.id}</h3>
        <table className="table table-striped">
          {transactionRows}
        </table>
      </div>
    );
  }
});
