require 'spec_helper'

describe TransactionsController do

  # describe "GET 'new'" do
  #   it "returns http success" do
  #     get 'new'
  #     expect(response).to be_success
  #   end
  # end

  let(:period) { Period.create(status: 'open') }
  let(:p1) { Account.create(name: 'Person 1') }
  let(:p2) { Account.create(name: 'Person 2') }
  let(:fp) { Account.create(name: 'False Profit, LLC') }


  describe "POST 'create'" do
    it "returns http success" do
      shares = { p1.id.to_s => "50", p2.id.to_s => "50" }
      attrs = { amount: 100, description: "Soap", account_id: p1.id, shares: shares }
      post 'create', period_id: period.id, transaction: attrs
      expect(response).to be_success
      transaction = Transaction.last

      expect(transaction.amount).to eq(100)
      expect(transaction.shares).to eq(shares)
      expect(transaction.account).to eq(p1)
    end
  end

  # describe "GET 'update'" do
  #   it "returns http success" do
  #     get 'update'
  #     expect(response).to be_success
  #   end
  # end

  # describe "GET 'edit'" do
  #   it "returns http success" do
  #     get 'edit'
  #     expect(response).to be_success
  #   end
  # end

  # describe "GET 'destroy'" do
  #   it "returns http success" do
  #     get 'destroy'
  #     expect(response).to be_success
  #   end
  # end

  # describe "GET 'index'" do
  #   it "returns http success" do
  #     get 'index'
  #     expect(response).to be_success
  #   end
  # end

end
