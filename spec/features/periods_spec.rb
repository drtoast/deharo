require 'spec_helper'

feature "Periods" do

  before do
    @period = Period.create
    @account1 = Account.create name: "Dr. Toast"
    @account2 = Account.create name: "Shipwrek"
    @account3 = Account.create name: "False Profit", kind: 'corporate'
  end

  scenario "with a starting balance and some transactions", js: true do
    @period.opening_balances = {
      @account1.id => 500,
      @account2.id => 1000
    }
    @period.save!

    Transaction.create!({
      account: @account1,
      period: @period,
      description: "salty snacks",
      amount: 2000,
      shares: {
        @account1.id => 1,
        @account2.id => 1
      }
    })

    Transaction.create!({
      account: @account2,
      period: @period,
      description: "fancy hats",
      amount: 2500,
      shares: {
        @account1.id => 2,
        @account2.id => 3
      }
    })

    visit "/"

    expect(find('table.balances tr:nth-child(1)').text).to eq("account opening debits credits oweage closing")
    expect(find('table.balances tr:nth-child(2)').text).to eq("Dr. Toast $5.00 -$20.00 $20.00 -$5.00")
    expect(find('table.balances tr:nth-child(3)').text).to eq("Shipwrek $10.00 -$25.00 $25.00 -$10.00")
    expect(find('table.balances tr:nth-child(4)').text).to eq("False Profit $0.00 $0.00 $0.00 $0.00")
  end

end
