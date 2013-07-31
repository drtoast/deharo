class Balance
  def initialize(accounts)
    @accounts = accounts
  end

  def calculate(period)
    @results = {}
    transactions = transaction_amounts(period)
    @accounts.each do |account|
      total_payments      = payments(period, account)
      transaction_shares  = transactions[account] || 0
      opening_balance = period.opening_balances[account.id.to_s] || 0
      closing_balance = period.closing_balances[account.id.to_s] || 0
      @results[account] = {
        opening: opening_balance,
        shares: transaction_shares,
        payments: total_payments,
        balance: opening_balance - transaction_shares + total_payments,
        closing: closing_balance
      }
    end
    @results
  end

  def for(account)
    @results[account]
  end

  private

  def payments(period, account)
    account.transactions.where(period_id: period.id).sum(:amount)
  end

  def transaction_amounts(period)
    result = {}
    period.transactions.each do |transaction|
      @accounts.each do |account|
        result[account] ||= 0
        result[account] += transaction.amount_for_account(account)
      end
    end
    result
  end

end
