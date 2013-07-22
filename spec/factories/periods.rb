# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :period do
    status "MyString"
    opened_at "2013-07-21 18:58:41"
    closed_at "2013-07-21 18:58:41"
    open_balances ""
    close_balances ""
  end
end
