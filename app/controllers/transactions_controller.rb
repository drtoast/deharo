class TransactionsController < ApplicationController
  def new
    accounts
    @transaction = period.transactions.build shares: {}
  end

  def create
    accounts
    @transaction = period.transactions.build(transaction_params)
    if period.open?
      if @transaction.save
        flash[:notice] = "Transaction created"
        redirect_to period_path(Period.open)
      else
        flash[:error] = "Can't create transaction: #{@transaction.errors.full_messages.to_sentence}"
        render :new
      end
    else
      flash[:error] = "Can't create transaction: period is closed"
      render :new
    end
  end

  def update
    accounts
    @transaction = period.transactions.find params[:id]
    if period.open?
      if @transaction.update_attributes(transaction_params)
        flash[:notice] = "Transaction #{@transaction.id} updated"
      else
        flash[:error] = "Can't update transaction: #{@transaction.errors.full_messages.to_sentence}"
      end
    else
      flash[:error] = "Can't update transaction: period is closed"
    end
    render :edit
  end

  def edit
    accounts
    @transaction = period.transactions.find params[:id]
  end

  def destroy
    accounts
    @transaction = period.transactions.find params[:id]
    if period.open?
      if @transaction.destroy
        flash[:notice] = "Transaction deleted"
        redirect_to period_path(Period.open)
      else
        flash[:error] = "Can't delete transaction: #{@transaction.errors.full_messages.to_sentence}"
        render :edit
      end
    else
      flash[:error] = "Can't delete transaction: period is closed"
      render :edit
    end
  end

  def index
    @transactions = period.transactions.order('created_at DESC')
  end

  private

  def accounts
    @accounts ||= Account.active
  end

  def period
    @period ||= Period.find(params[:period_id])
  end

  def transaction_params
    p = params.require(:transaction).permit(:amount, :description, :account_id)
    p[:shares] = params[:transaction][:shares]
    p
  end
end
