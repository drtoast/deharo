class PeriodsController < ApplicationController
  def show
    @period = Period.find params[:id]

    @balance = Balance.new(Account.all)
    @balance.calculate(@period)
    @totals = @balance.totals
    @summary = @balance.results
  end

  def detail
    show
  end

  def current
    redirect_to period_path(current_period)
  end

  def index
    @periods = Period.all.order('created_at DESC')
  end

  def update
  end

  def close
    @period = Period.find params[:id]
    if @period.close!(Account.all)
      flash[:notice] = "Period #{@period.id} closed, opening period #{@period.id + 1}"
      redirect_to period_path(current_period)
    else
      flash[:error] = "Could not close period #{@period.id}"
      redirect_to period_path(@period)
    end
  end

  def current
    redirect_to period_path(current_period)
  end
end
