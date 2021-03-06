class Period < ActiveRecord::Base
  has_many :transactions

  before_create :set_defaults

  STATUSES = {
    closed: 'closed',
    open: 'open'
  }

  def close!(accounts)
    return false if status == STATUSES[:closed]
    self.closing_balances = get_closing_balances(accounts)
    self.closed_at = Time.now
    self.status = STATUSES[:closed]
    save!
    Period.create(opening_balances: closing_balances, status: STATUSES[:open], opened_at: Time.now)
  end

  def open?
    status == STATUSES[:open]
  end

  def closed?
    status == STATUSES[:closed]
  end

  def self.open
    periods = self.where(status: STATUSES[:open])
    raise "ERROR: #{periods.length} open periods (must be exactly 1)" unless periods.length == 1
    periods.first
  end

  private

  def get_closing_balances(accounts)
    closing = {}
    balance = Balance.new(accounts)
    balance.calculate(self)
    balance.results.each do |account, summary|
      closing[account.id.to_s] = summary[:balance]
    end
    closing
  end

  def set_defaults
    self.status ||= STATUSES[:open]
    self.opened_at = Time.now
    self.opening_balances ||= {}
    self.closing_balances ||= {}
  end

end
