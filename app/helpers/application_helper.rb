module ApplicationHelper

  def alert_class(alert_type)
    alert_type = {
      alert: 'error',
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
end
