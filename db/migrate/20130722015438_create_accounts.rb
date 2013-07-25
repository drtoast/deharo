class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :kind
      t.boolean :active

      t.timestamps
    end
  end
end
