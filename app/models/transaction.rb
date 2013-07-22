class Transaction < ActiveRecord::Base
  belongs_to :account
  belongs_to :period

  # scope :expense, -> { where(kind: 'expense') }
  # scope :payment, -> { where(kind: 'payment') }
  validate :period_open

  private

  def period_open
    period.open?
  end
end
