require 'spec_helper'

feature "Static Pages" do

  scenario "/help should include help text" do
    Period.create
    visit "/help"

    expect(page).to have_content "Entering Expenses"
  end
end
