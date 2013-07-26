require 'spec_helper'

describe Balance do

  let(:p1) { Account.create name: 'Person 1' }
  let(:p2) { Account.create name: 'Person 2' }
  let(:fp) { Account.create name: 'False Profit, LLC' }
  let(:accounts) { [p1, p2, fp] }
  let(:period1) { Period.create }
  let(:balance) { Balance.new(period1) }

  def account_balance(account, period)
    accounts = [account]
    balance = Balance.new(accounts)
    balance.calculate(period)
    balance.for(account)[:balance]
  end

  context 'calculating a balance' do

    it 'calculates the balance for a period' do
      # shopping trip
      attrs = {
        account: p1,
        period: period1,
        description: 'groceries',
        amount: 100,
        shares: { p1.id => 75, p2.id => 25 }
      }
      Transaction.create!(attrs)
      expect(account_balance(p1, period1)).to eq(25)
      expect(account_balance(p2, period1)).to eq(-25)
      expect(account_balance(fp, period1)).to eq(0)

      # rent entered
      attrs = {
        account: fp,
        period: period1,
        description: 'rent',
        amount: 1000,
        shares: { p1.id => 50, p2.id => 50 }
      }
      Transaction.create(attrs)
      period1.reload
      expect(account_balance(p1, period1)).to eq(-475)
      expect(account_balance(p2, period1)).to eq(-525)
      expect(account_balance(fp, period1)).to eq(1000)

      # rent paid by p1
      attrs = {
        account: p1,
        period: period1,
        description: 'pay rent',
        amount: 600, # overpaid by 100
        shares: { fp.id => 1 }
      }
      Transaction.create(attrs)
      period1.reload
      expect(account_balance(p1, period1)).to eq(125)
      expect(account_balance(p2, period1)).to eq(-525)
      expect(account_balance(fp, period1)).to eq(400)

      # rent paid by p2
      attrs = {
        account: p2,
        period: period1,
        description: 'pay rent',
        amount: 400, # underpaid by 100
        shares: { fp.id => 1 }
      }
      Transaction.create(attrs)
      period1.reload
      expect(account_balance(p1, period1)).to eq(125)
      expect(account_balance(p2, period1)).to eq(-125)
      expect(account_balance(fp, period1)).to eq(0)

      # close period
      period1.close!(accounts)
      period2 = Period.open
      expect(account_balance(p1, period2)).to eq(125)
      expect(account_balance(p2, period2)).to eq(-125)
      expect(account_balance(fp, period2)).to eq(0)

      # shopping trip
      attrs = {
        account: p1,
        period: period2,
        description: 'more groceries',
        amount: 100,
        shares: { p1.id => 75, p2.id => 25 }
      }
      Transaction.create(attrs)
      period2.reload
      expect(account_balance(p1, period2)).to eq(150)
      expect(account_balance(p2, period2)).to eq(-150)
      expect(account_balance(fp, period2)).to eq(0)

    end

    it 'rounds fractional cents' do
      attrs = {
        account: p1,
        period: period1,
        description: 'groceries',
        amount: 333,
        shares: { p1.id => 1, p2.id => 1 }
      }
      Transaction.create!(attrs)

      expect(account_balance(p1, period1)).to eq(167)
      expect(account_balance(p2, period1)).to eq(167)
      expect(account_balance(fp, period1)).to eq(0)
    end
  end
end
