# Populate the database with a small set of realistic sample data so that as a developer/designer, you can use the
# application without having to create a bunch of stuff or pull down production data.
#
# After running db:sample_data, a developer/designer should be able to fire up the app, sign in, browse data and see
# examples of practically anything (interesting) that can happen in the system.
#
# It's a good idea to build this up along with the features; when you build a feature, make sure you can easily demo it
# after running db:sample_data.
#
# Data that is required by the application across all environments (i.e. reference data) should _not_ be included here.
# That belongs in seeds.rb instead.

bob = Account.find_or_create_by name: "Bob", kind: "personal"
alice = Account.find_or_create_by name: "Alice", kind: "personal"
ted = Account.find_or_create_by name: "Ted", kind: "personal"
quvenzhane = Account.find_or_create_by name: "Quvenzhané", kind: "personal"
checking = Account.find_or_create_by name: "Checking", kind: "corporate"
period = Period.last

period.transactions.create(account: bob, amount: 400, description: "Wheat bread", shares: {
  bob.id => 1,
  alice.id => 1,
  ted.id => 1,
  quvenzhane.id => 1,
  checking.id => 0
})

period.transactions.create(account: alice, amount: 10000, description: "Boat building materials", shares: {
  bob.id => 1,
  alice.id => 4,
  ted.id => 1,
  quvenzhane.id => 1,
  checking.id => 0
})

period.transactions.create(account: checking, amount: 60000, description: "Rent", shares: {
  bob.id => 1,
  alice.id => 1,
  ted.id => 1,
  quvenzhane.id => 1,
  checking.id => 0
})

period.transactions.create(account: quvenzhane, amount: 15000, description: "Pay Rent", shares: {
  bob.id => 0,
  alice.id => 0,
  ted.id => 0,
  quvenzhane.id => 0,
  checking.id => 1
})
