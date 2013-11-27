require 'spec_helper'

describe TransactionsController do

  let(:period) { Period.create! }
  let(:p1) { Account.create!(name: 'Person 1') }
  let(:p2) { Account.create!(name: 'Person 2') }
  let(:fp) { Account.create!(name: 'False Profit, LLC') }
  let(:shares) { { p1.id.to_s => 25, p2.id.to_s => 75 } }
  let(:transaction) { period.transactions.create!(account: fp, amount: 1000000, description: 'rent', shares: shares)}

  describe "GET 'new'" do
    context "when given a transaction id" do
      it 'creates a new transaction with properties of the preset' do
        get 'new', transaction_id: transaction.id
        new_transaction = assigns[:transaction]
        expect(new_transaction.account).to eq(fp)
        expect(new_transaction.amount).to eq(1000000)
        expect(new_transaction.shares).to eq(shares)
      end
    end
  end

  describe "POST 'create'" do
    it "creates a transaction" do
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
