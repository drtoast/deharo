require 'spec_helper'

feature "Transactions" do

  before do
    @period = Period.create
    @account1 = Account.create name: "Dr. Toast"
    @account2 = Account.create name: "Shipwrek"
    @account3 = Account.create name: "Soap Factory", kind: 'corporate'

    visit "/"
    click_link "add"
  end

  scenario "adding an equal-shares transaction", js: true do
    select "Dr. Toast", from: 'transaction_account_id'
    fill_in "transaction_description", with: "wheat bread"
    fill_in "transaction_amount_dollars", with: "10.50"

    find(".btn.shares.equalize").click
    expect(page).to have_content("$5.25")
    click_button "Create Transaction"
    expect(page).to have_content("Transaction created")

    transaction = Transaction.last
    expect(transaction.account).to eq(@account1)
    expect(transaction.description).to eq("wheat bread")
    expect(transaction.period).to eq(@period)
    expect(transaction.amount).to eq(1050)
    expect(transaction.shares).to eq({@account1.id.to_s => "1", @account2.id.to_s => "1", @account3.id.to_s => "0"})
  end

  scenario "adding a rent transaction", js: true do
    select "Soap Factory", from: 'transaction_account_id'
    fill_in "transaction_description", with: "rent"
    fill_in "transaction_amount_dollars", with: "5000"

    fill_in "transaction[shares][#{@account1.id}]", with: 1
    fill_in "transaction[shares][#{@account2.id}]", with: 2

    expect(page).to have_content("$1666.67")
    expect(page).to have_content("$3333.33")

    click_button "Create Transaction"
    expect(page).to have_content("Transaction created")

    transaction = Transaction.last
    expect(transaction.account).to eq(@account3)
    expect(transaction.description).to eq("rent")
    expect(transaction.period).to eq(@period)
    expect(transaction.amount).to eq(500000)
    expect(transaction.shares).to eq({@account1.id.to_s => "1", @account2.id.to_s => "2", @account3.id.to_s => ""})

    # pay balance via link in current period
    visit "/"
    click_link "-$1,666.67"
    click_button "Create Transaction"
    expect(page).to have_content("Transaction created")

    transaction = Transaction.last
    expect(transaction.account).to eq(@account1)
    expect(transaction.description).to eq("pay balance")
    expect(transaction.period).to eq(@period)
    expect(transaction.amount).to eq(166667)
    expect(transaction.shares).to eq({@account1.id.to_s => "", @account2.id.to_s => "", @account3.id.to_s => "1"})
  end

  scenario "paying rent", js: true do
    select "Dr. Toast", from: 'transaction_account_id'
    fill_in "transaction_description", with: "pay rent"
    fill_in "transaction_amount_dollars", with: "123.45"

    find(".btn.shares.pay-rent").click
    expect(page).to have_content("$123.45")
    click_button "Create Transaction"
    expect(page).to have_content("Transaction created")

    transaction = Transaction.last
    expect(transaction.account).to eq(@account1)
    expect(transaction.period).to eq(@period)
    expect(transaction.amount).to eq(12345)
    expect(transaction.shares).to eq({@account1.id.to_s => "0", @account2.id.to_s => "0", @account3.id.to_s => "1"})
  end
end
