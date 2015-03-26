require 'csv'

class CsvExport::Periods
  def initialize(periods)
    @periods = periods
    @balance = Balance.new(accounts)
  end

  def header
    [period_attrs, account_attrs].flatten
  end

  def rows
    @periods.each do |period|
      yield [
        period_columns(period),
        account_columns(period)
      ].flatten
    end
  end

  private

  def period_attrs
    %w(period status opened_at closed_at)
  end

  def account_attrs
    accounts.map do |account|
      [
        "#{account.name} (opening)",
        "#{account.name} (debits)",
        "#{account.name} (credits)",
        "#{account.name} (closing)"
      ]
    end
  end

  def period_columns(period)
    [
      period.id,
      period.status,
      period.opened_at,
      period.closed_at
    ]
  end

  def account_columns(period)
    @balance.calculate(period)
    @balance.results.map do |account, balances|
      [
        period.opening_balances[account.id.to_s].to_i / 100.0,
        (0 - balances[:debits]).to_i / 100.0,
        balances[:credits].to_i / 100.0,
        period.closing_balances[account.id.to_s].to_i / 100.0
      ]
    end.flatten
  end

  def accounts
    accounts ||= Account.all.order(:kind, :id)
  end

end
