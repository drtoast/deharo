class CreatePeriods < ActiveRecord::Migration
  def change
    create_table :periods do |t|
      t.string :status
      t.datetime :opened_at
      t.datetime :closed_at
      t.json :opening_balances
      t.json :closing_balances

      t.timestamps
    end
  end
end
