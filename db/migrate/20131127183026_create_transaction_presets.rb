class CreateTransactionPresets < ActiveRecord::Migration
  def change
    create_table :transaction_presets do |t|
      t.references :transaction, index: true

      t.timestamps
    end
  end
end
