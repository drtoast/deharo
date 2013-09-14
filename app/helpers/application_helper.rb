module ApplicationHelper

  def alert_class(alert_type)
    alert_type = {
      alert: 'danger',
      error: 'danger',
      notice: 'info'
    }.fetch(alert_type, alert_type.to_s)
    "alert-#{alert_type}"
  end

  def cents_to_dollars(cents)
    cents / 100.0
  end

  def cents_to_currency(cents)
    number_to_currency(cents_to_dollars(cents.to_i))
  end

  def dollars_to_cents(dollars)
    round(dollars * 100, 0)
  end

  def balance_to_oweage(cents)
    number_to_currency(0 - cents_to_dollars(cents.to_i))
  end

  def account_name(account_id)
    Account.find(account_id).name
  end

  def currency_class(amount)
    amount.to_i < 0 ? 'text-warning' : ''
  end

  def link_to_account_balance_transaction(account, balance)
    if balance < 0
      link_to cents_to_currency(balance), new_transaction_path({
        account_id: account.id,
        amount: 0 - balance,
        share_id: Account.corporate.first.id,
        description: 'pay balance'
      })
    else
      cents_to_currency(balance)
    end
  end

end
