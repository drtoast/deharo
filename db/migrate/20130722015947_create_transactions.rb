class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.string :description
      t.string :kind
      t.integer :amount
      t.string :status
      t.json :shares

      t.references :period
      t.references :account

      t.timestamps
    end
  end
end
