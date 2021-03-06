class Transaction < ActiveRecord::Base
  belongs_to :account
  belongs_to :period
  has_one :transaction_preset, dependent: :destroy

  before_create :set_defaults

  # scope :expense, -> { where(kind: 'expense') }
  # scope :payment, -> { where(kind: 'payment') }
  validate :period_open
  validate :has_shares
  validates :description, presence: true, length: { minimum: 1 }
  validates :amount, numericality: { only_integer: true }
  validates :account_id, presence: true

  def total_shares
    shares.values.map{|s| s.to_i}.sum.to_i
  end

  def account_shares(account)
    shares[account.id.to_s].to_i
  end

  def debit_for_account(account)
    if total_shares > 0
      (amount * (account_shares(account).to_f / total_shares.to_f)).round
    else
      0
    end
  end

  def relevant_to?(account)
    (account.id == account_id) || (debit_for_account(account) > 0)
  end

  private

  def set_defaults
    self.shares ||= {}
  end

  def period_open
    period.open?
  end

  def has_shares
    unless shares.values.map(&:to_i).sum >= 1
      errors.add(:base, "Must specify at least 1 share")
    end
    # unless shares.keys
  end
end
