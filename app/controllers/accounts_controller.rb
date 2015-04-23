class AccountsController < ApplicationController
  def new
    @account = Account.new
  end

  def create
    @account = Account.new account_params

    if @account.save
      flash[:notice] = "Account created"
      redirect_to period_path(current_period)
    else
      flash[:error] = "Can't create account: #{@account.errors.full_messages.to_sentence}"
      render :new
    end
  end

  def update
    @account = Account.find params[:id]
    if @account.update_attributes(account_params)
      flash[:notice] = "Account #{@account.id} updated"
      redirect_to accounts_path
    else
      flash[:error] = "Can't update account: #{@account.errors.full_messages.to_sentence}"
      render :edit
    end
  end

  def edit
    @account = Account.find params[:id]
  end

  def index
    @accounts = Account.order('name')

    respond_to do |format|
      format.html do
        @account = Account.new
      end

      format.json do
        render json: @accounts.to_json
      end
    end
  end

  private

  def account_params
    params.require(:account).permit(:name, :active)
  end
end
