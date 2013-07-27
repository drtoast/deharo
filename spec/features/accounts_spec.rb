require 'spec_helper'

feature "Accounts" do

  scenario "creating accounts", :js => true do
    Period.create
    visit "/accounts"

    expect(page).to have_content "Name"

    within '#new_account' do

    fill_in "account_name", with: 'Dr. Toast'
    click_button 'Create Account'

    account = Account.last

    expect(account.name).to eq('Dr. Toast')
    expect(account.kind).to eq('personal')

    visit "/accounts"
    expect(page).to have_content("Dr. Toast")
  end
end
