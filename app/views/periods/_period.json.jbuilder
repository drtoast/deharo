json.(period, :id, :status, :opened_at, :closed_at, :opening_balances, :closing_balances, :created_at, :updated_at)

json.transactions period.transactions, partial: 'transactions/transaction.json.jbuilder', as: :transaction
