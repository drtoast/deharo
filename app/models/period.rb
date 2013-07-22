class Period < ActiveRecord::Base
  has_many :transactions

  STATUSES = {
    closed: 'closed',
    open: 'open'
  }

  def close!
    return false if status == STATUSES[:closed]
    self.closing_balances = Balance.new(self).balances
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
end
