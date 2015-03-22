require 'csv'

class CsvExport
  def initialize(periods)
    @periods = periods
  end

  def header
    [transaction_attrs, share_attrs].flatten
  end

  def rows
    @periods.each do |period|
      period.transactions.order(:created_at).each do |transaction|
        yield [
          transaction_columns(transaction),
          share_columns(transaction)
        ].flatten
      end
    end
  end

  private

  def transaction_attrs
    %w(id period created description purchaser amount)
  end

  def share_attrs
    accounts.map do |account|
      [account.name, 'shares']
    end
  end

  def transaction_columns(transaction)
    [
      transaction.id,
      transaction.period_id,
      transaction.created_at,
      transaction.description,
      transaction.account.name,
      transaction.amount.to_i / 100.0,
    ]
  end

  def share_columns(transaction)
    accounts.map do |account|
      [
        transaction.debit_for_account(account) / 100.0,
        transaction.account_shares(account)
      ]
    end.flatten
  end

  def accounts
    accounts ||= Account.all.order(:kind, :id)
  end


end
