class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_period
    Period.open
  end

  def all_accounts
    @all_accounts ||= Account.all
  end

  private

  def accounts
    @accounts ||= Account.active
  end
end
