/** @jsx React.DOM **/

var TransactionForm = React.createClass({
  propTypes: {
    description: React.PropTypes.string
  },

  render: function () {
    console.log(this.props);
    return (
      <div className="transaction-form">
        <form className="form-horizontal">
          <input type="hidden" name="authenticity_token" value="c7GL2Jos6yqa0yVWtwwC4Cb/QP3Uw1zaTECKiVhBSRv8VFVNglZa176Sn6UnLm9hAk7/o48vbmC6TFzC2RGwGQ==" />

          <div className="form-group">
            <label className="col-sm-2 control-label">Amount</label>
            <div className="col-sm-4">
              <input className="form-control" name="transaction_amount_dollars" type="text" value={this.props.amount} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Description</label>
            <div className="col-sm-4">
              <input className="form-control" type="text" value={this.props.description} name="transaction[description]" />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Created</label>
            <div className="col-sm-4">
              <span className="form-control">{this.props.created_at}</span>
            </div>
          </div>

          <hr />

          <div className="form-group">
            <div className="col-sm-2"></div>
            <div className="col-sm-4">
              <input type="submit" name="commit" value="Update Transaction" className="btn btn-primary btn-block" />
            </div>
          </div>
        </form>

      </div>
    );
  }
});
