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

  def summary(period)
    @balances = Balance.new(@period).balances
    summary = {}
    Account.all.each do |account|
      @balances[account.id] ||= {}
      summary[account] = {
        opening: @period.opening_balances[account.id.to_s] || 0,
        payments: @balances[account.id][:payments] || 0,
        shares: @balances[account.id][:shares] || 0,
        current: @balances[account.id][:balance] || 0,
        closing: @period.closing_balances[account.id.to_s] || 0
      }
    end
    summary
  end

end
