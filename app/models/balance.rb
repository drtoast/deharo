class Balance
  def initialize(period)
    @period = period
  end

  def balances
    opening       = opening_balances(@period)
    transactions  = transaction_amounts(@period)
    payments      = account_payments(@period)
    results = {}
    accounts.each do |account|
      opening_balance     = opening[account.id.to_s] || 0
      transaction_shares  = transactions[account.id.to_s] || 0
      total_payments      = payments[account.id.to_s] || 0
      results[account.id] = opening_balance - transaction_shares + total_payments
    end
    results
  end

  private

  def opening_balances(period)
    period.opening_balances
  end

  def accounts
    @accounts ||= Account.all
  end

  def account_payments(period)
    payments = {}
    accounts.each do |account|
      payments[account.id.to_s] = account.transactions.where(period_id: period.id).sum(:amount)
    end
    payments
  end

  def transaction_total_shares(transaction)
    transaction.shares.values.map{|s| s.to_i}.sum.to_i
  end

  def transaction_amount(transaction, shares, total_shares)
    if total_shares > 0
      (transaction.amount * (shares.to_f / total_shares.to_f)).round
    else
      0
    end
  end

  def transaction_amounts(period)
    result = {}
    period.transactions.each do |transaction|
      total_shares = transaction_total_shares(transaction)
      transaction.shares.each do |account_id, shares|
        result[account_id] ||= 0
        result[account_id] += transaction_amount(transaction, shares, total_shares)
      end
    end
    result
  end

end
