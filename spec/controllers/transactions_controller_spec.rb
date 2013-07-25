require 'spec_helper'

describe TransactionsController do

  let(:period) { Period.create! }
  let(:p1) { Account.create!(name: 'Person 1') }
  let(:p2) { Account.create!(name: 'Person 2') }
  let(:fp) { Account.create!(name: 'False Profit, LLC') }

  describe "POST 'create'" do
    it "returns http success" do
      shares = { p1.id.to_s => "50", p2.id.to_s => "50" }
      attrs = { amount: 100, description: "Soap", account_id: p1.id, shares: shares }
      post 'create', period_id: period.id, transaction: attrs

      transaction = Transaction.last
      expect(transaction.account).to eq(p1)
      expect(transaction.amount).to eq(100)
      expect(transaction.shares).to eq(shares)
      expect(transaction.account).to eq(p1)
    end
  end

end
