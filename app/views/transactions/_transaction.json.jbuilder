json.(transaction, :description, :kind, :amount, :status, :shares, :period_id, :account_id, :created_at, :updated_at)

json.account do
  json.(transaction.account, :name)
end
