class AddIndexes < ActiveRecord::Migration
  def change
    add_index :transactions, [:period_id, :account_id]
    add_index :transactions, [:account_id, :period_id]
  end
end
