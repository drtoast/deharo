require 'spec_helper'

feature "Transactions" do

  before do
    @account1 = Account.create name: "Dr. Toast"
    @account2 = Account.create name: "Shipwrek"
    @account3 = Account.create name: "False Profit", kind: 'corporate'
    @period = Period.create opening_balances: {
      @account1.id => 500,
      @account2.id => 1000
    }
  end

  scenario "with a starting balance and some transactions", js: true do
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
        @account1.id => 1,
        @account2.id => 2
      }
    })

    visit "/"

    expect(find('table.balances tr:nth-child(1)').text).to eq("account opening debits credits current closing")
    expect(find('table.balances tr:nth-child(2)').text).to eq("Dr. Toast $5.00 -$18.33 $20.00 $6.67")
    expect(find('table.balances tr:nth-child(3)').text).to eq("Shipwrek $10.00 -$26.67 $25.00 $8.33")
    expect(find('table.balances tr:nth-child(4)').text).to eq("False Profit $0.00 $0.00 $0.00 $0.00")

    click_button "Close Period"

    # period 1 is closed
    p1 = Period.first
    expect(p1.status).to eq('closed')
    closing_balances = {@account1.id.to_s => 667, @account2.id.to_s => 833, @account3.id.to_s => 0}
    expect(p1.closing_balances).to eq(closing_balances)

    # period 2 is open
    p2 = Period.last
    expect(p2.status).to eq('open')
    expect(p2.opening_balances).to eq(p1.closing_balances)

    expect(find('table.balances tr:nth-child(1)').text).to eq("account opening debits credits current closing")
    expect(find('table.balances tr:nth-child(2)').text).to eq("Dr. Toast $6.67 $0.00 $0.00 $6.67")
    expect(find('table.balances tr:nth-child(3)').text).to eq("Shipwrek $8.33 $0.00 $0.00 $8.33")
    expect(find('table.balances tr:nth-child(4)').text).to eq("False Profit $0.00 $0.00 $0.00 $0.00")
  end

end
