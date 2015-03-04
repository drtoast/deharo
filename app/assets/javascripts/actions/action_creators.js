var ActionTypes = AppConstants.ActionTypes;

var ActionCreators = {
  createTransaction: function(account, amount, shares) {
    AppDispatcher.dispatch({
      type: ActionTypes.TRANSACTION_CREATE,
      account: account,
      amount: amount,
      shares: shares
    });
  }
};
