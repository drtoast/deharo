class PeriodsController < ApplicationController
  def show
    @period = Period.find params[:id]
    @summary = Balance.new(accounts).calculate(@period)
  end

  def index
    @periods = Period.all
  end

  def update
  end

  def close
    @period = Period.find params[:id]
    if @period.close!(accounts)
      flash[:notice] = "Period #{@period.id} closed, opening period #{@period.id + 1}"
      redirect_to period_path(Period.open)
    else
      flash[:error] = "Could not close period #{@period.id}"
      redirect_to period_path(@period)
    end
  end

  def current
    redirect_to period_path(Period.open)
  end

  private

  def accounts
    Account.all
  end
end
