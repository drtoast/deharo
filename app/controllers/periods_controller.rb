class PeriodsController < ApplicationController
  def show
    @period = Period.find params[:id]
    @summary = summary(@period)
  end

  def index
    @periods = Period.all
  end

  def update
  end

  def close
    @period = Period.find params[:id]
    if @period.close!
      flash[:notice] = "Period closed"
      redirect_to period_path(Period.open)
    else
      flash[:error] = "Could not close period"
      redirect_to period_path(@period)
    end
  end

  def current
    redirect_to period_path(Period.open)
  end

  private

  def summary(period)
    @balances = Balance.new(@period).balances
    summary = {}
    Account.all.each do |account|
      summary[account] = {
        opening: @period.opening_balances[account.id.to_s] || 0,
        current: @balances[account.id] || 0,
        closing: @period.closing_balances[account.id.to_s] || 0
      }
    end
    summary
  end

end
