class Transaction < ActiveRecord::Base
  belongs_to :account
  belongs_to :period

  # scope :expense, -> { where(kind: 'expense') }
  # scope :payment, -> { where(kind: 'payment') }
  validate :period_open
  validates :description, presence: true, length: { minimum: 1 }
  validates :amount, numericality: { only_integer: true }
  validates :account_id, presence: true

  private

  def period_open
    period.open?
  end
end
