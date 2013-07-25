class Account < ActiveRecord::Base

  KINDS = {
    personal: 'personal',
    corporate: 'corporate'
  }

  has_many :transactions

  before_create :set_defaults

  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }
  scope :personal, -> { where(kind: KINDS[:personal]) }
  scope :corporate, -> { where(kind: KINDS[:corporate]) }

  private

  def set_defaults
    self.kind ||= KINDS[:personal]
    self.active ||= true
  end
end
