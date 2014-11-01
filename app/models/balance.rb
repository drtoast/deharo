class Balance
  attr_reader :results, :totals

  def initialize(accounts)
    @accounts = accounts
  end

  def calculate(period, limit=nil)
    @results = {}
    @totals = {
      opening: 0,
      debits: 0,
      credits: 0,
      current: 0,
      closing: 0
    }

    debits = period_debits(period, limit)
    @accounts.each do |account|
      total_credits      = credits(period, account, limit)
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

      @totals[:opening] += @results[account][:opening].to_i
      @totals[:debits]  -= @results[account][:debits].to_i
      @totals[:credits] += @results[account][:credits].to_i
      @totals[:current] += @results[account][:balance].to_i
      @totals[:closing] += @results[account][:closing].to_i
    end
    true
  end

  def for(account)
    @results[account]
  end

  private

  def credits(period, account, limit=nil)
    q = account.transactions.order(:id).where(period_id: period.id)
    q = q.where("id <= ?", limit) if limit
    q.sum(:amount)
  end

  def period_debits(period, limit=nil)
    result = {}
    q = period.transactions.order(:id)
    q = q.where("id <= ?", limit) if limit
    q.each do |transaction|
      @accounts.each do |account|
        result[account] ||= 0
        result[account] += transaction.debit_for_account(account)
      end
    end
    result
  end

end
