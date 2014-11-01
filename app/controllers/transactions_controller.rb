class TransactionsController < ApplicationController
  def new
    accounts
    if params[:transaction_id]
      old = Transaction.find params[:transaction_id]
      @transaction = Transaction.new(old.attributes.tap {|a| a.delete :id})
    else
      @transaction = Transaction.new new_transaction_params
    end
  end

  def create
    accounts
    @transaction = current_period.transactions.build(transaction_params)
    if @transaction.save
      flash[:notice] = "Transaction created"
      redirect_to period_path(current_period)
    else
      flash[:error] = "Can't create transaction: #{@transaction.errors.full_messages.to_sentence}"
      render :new
    end
  end

  def update
    accounts
    @transaction = Transaction.find params[:id]
    if @transaction.period.open?
      if @transaction.update_attributes(transaction_params)
        flash[:notice] = "Transaction #{@transaction.id} updated"
        redirect_to period_path(current_period)
      else
        flash[:error] = "Can't update transaction: #{@transaction.errors.full_messages.to_sentence}"
        period
        render :edit
      end
    else
      flash[:error] = "Can't update transaction: period is closed"
      period
      render :edit
    end
  end

  def edit
    accounts
    @transaction = period.transactions.find params[:id]
  end

  def destroy
    accounts
    @transaction = Transaction.find params[:id]
    if @transaction.period.open?
      if @transaction.destroy
        flash[:notice] = "Transaction deleted"
        redirect_to period_path(current_period)
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
    @account = Account.find(params[:account_id]) if params[:account_id]
    @transactions = period.transactions.order('created_at DESC')
  end

  private

  def period
    @period ||= Period.find(params[:period_id])
  end

  def transaction_params
    p = params.require(:transaction).permit(:amount, :description, :account_id)
    p[:shares] = params[:transaction][:shares]
    p
  end

  def new_transaction_params
    p = { shares: {} }

    p[:description] = params[:description] if params[:description]
    p[:amount] = params[:amount].to_i if params[:amount]
    p[:account_id] = params[:account_id] if params[:account_id]
    p[:shares][params[:share_id]] = 1 if params[:share_id]
    p
  end
end
