class Balance
  def initialize(accounts)
    @accounts = accounts
  end

  def calculate(period)
    @results = {}
    debits = period_debits(period)
    @accounts.each do |account|
      total_credits      = credits(period, account)
      total_debits  = debits[account] || 0
      opening_balance = period.opening_balances[account.id.to_s] || 0
      closing_balance = period.closing_balances[account.id.to_s] || 0
      @results[account] = {
        opening: opening_balance,
        debits: total_debits,
        credits: total_credits,
        balance: opening_balance - total_debits + total_credits,
        closing: closing_balance
      }
    end
    @results
  end

  def for(account)
    @results[account]
  end

  private

  def credits(period, account)
    account.transactions.where(period_id: period.id).sum(:amount)
  end

  def period_debits(period)
    result = {}
    period.transactions.each do |transaction|
      @accounts.each do |account|
        result[account] ||= 0
        result[account] += transaction.debit_for_account(account)
      end
    end
    result
  end

end
