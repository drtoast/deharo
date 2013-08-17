class PeriodsController < ApplicationController
  def show
    @period = Period.find params[:id]
    @summary = Balance.new(accounts).calculate(@period)

    @totals = {
      opening: 0,
      debits: 0,
      credits: 0,
      current: 0,
      closing: 0
    }

    @summary.each do |account, balances|
      @totals[:opening] += balances[:opening].to_i
      @totals[:debits] -= balances[:debits].to_i
      @totals[:credits] += balances[:credits].to_i
      @totals[:current] += balances[:balance].to_i
      @totals[:closing] += balances[:closing].to_i
    end
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
    if @period.close!(accounts)
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
