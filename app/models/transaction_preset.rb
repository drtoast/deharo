class TransactionPreset < ActiveRecord::Base
  belongs_to :base_transaction, class_name: 'Transaction', foreign_key: :transaction_id
end
