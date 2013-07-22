# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :transaction do
    description "MyString"
    kind "MyString"
    amount 1
    status "MyString"
    shares ""
  end
end
