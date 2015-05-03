class TransactionPreset < ActiveRecord::Base
  belongs_to :transaction_template, class_name: 'Transaction', foreign_key: 'transaction_id'
end
