require 'spec_helper'

describe Balance do

  let(:p1) { Account.create name: 'Person 1' }
  let(:p2) { Account.create name: 'Person 2' }
  let(:fp) { Account.create name: 'False Profit, LLC' }
  let(:opening_balances) { { p1.id => 0, p2.id => 0, fp.id => 0 } }
  let(:period1) { Period.create(status: 'open', opening_balances: opening_balances).reload }
  let(:balance) { Balance.new(period1) }

  context 'calculating a balance' do

    it 'calculates the balance for a period' do
      # shopping trip
      attrs = {
        account: p1,
        period: period1,
        amount: 100,
        shares: { p1.id => 75, p2.id => 25 }
      }
      Transaction.create(attrs)
      balances = balance.balances
      expect(balances[p1.id]).to eq(25)
      expect(balances[p2.id]).to eq(-25)
      expect(balances[fp.id]).to eq(0)

      # rent entered
      attrs = {
        account: fp,
        period: period1,
        amount: 1000,
        shares: { p1.id => 50, p2.id => 50 }
      }
      Transaction.create(attrs)
      period1.reload
      balances = balance.balances
      expect(balances[p1.id]).to eq(-475)
      expect(balances[p2.id]).to eq(-525)
      expect(balances[fp.id]).to eq(1000)

      # rent paid by p1
      attrs = {
        account: p1,
        period: period1,
        amount: 600, # overpaid by 100
        shares: { fp.id => 1 }
      }
      Transaction.create(attrs)
      period1.reload
      balances = balance.balances
      expect(balances[p1.id]).to eq(125)
      expect(balances[p2.id]).to eq(-525)
      expect(balances[fp.id]).to eq(400)

      # rent paid by p2
      attrs = {
        account: p2,
        period: period1,
        amount: 400, # underpaid by 100
        shares: { fp.id => 1 }
      }
      Transaction.create(attrs)
      period1.reload
      balances = balance.balances
      expect(balances[p1.id]).to eq(125)
      expect(balances[p2.id]).to eq(-125)
      expect(balances[fp.id]).to eq(0)

      # close period
      period1.close!
      period2 = Period.open
      balances = Balance.new(period2).balances
      expect(balances[p1.id]).to eq(125)
      expect(balances[p2.id]).to eq(-125)
      expect(balances[fp.id]).to eq(0)

      # shopping trip
      attrs = {
        account: p1,
        period: period2,
        amount: 100,
        shares: { p1.id => 75, p2.id => 25 }
      }
      Transaction.create(attrs)
      period2.reload
      balances = Balance.new(period2).balances
      expect(balances[p1.id]).to eq(150)
      expect(balances[p2.id]).to eq(-150)
      expect(balances[fp.id]).to eq(0)

    end
  end
end
