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
      respond_to do |format|
        format.html do
          flash[:notice] = "Transaction created"
          redirect_to period_path(current_period)
        end

        format.json do
          render status: 201, json: @transaction.to_json
        end
      end
    else
      respond_to do |format|
        format.html do
          flash[:error] = "Can't create transaction: #{@transaction.errors.full_messages.to_sentence}"
          render :new
        end

        format.json { render_unprocessable_entity }
      end
    end
  end

  def update
    accounts
    @transaction = Transaction.find params[:id]
    if @transaction.period.open?
      @transaction.update_attributes(transaction_params)
      if @transaction.errors.blank?
        respond_to do |format|
          format.html do
            flash[:notice] = "Transaction #{@transaction.id} updated"
            redirect_to period_path(current_period)
          end

          format.json do
            render json: @transaction.to_json
          end
        end
      else
        respond_to do |format|
          format.html do
            flash[:error] = "Can't update transaction: #{@transaction.errors.full_messages.to_sentence}"
            period
            render :edit
          end

          format.json { render_unprocessable_entity }
        end
      end
    else
      respond_to do |format|
        format.html do
          flash[:error] = "Can't update transaction: period is closed"
          period
          render :edit
        end

        format.json do
          render status: :forbidden, json: { errors: "Can't update transaction: period is closed"}
        end
      end
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
        respond_to do |format|
          format.html do
            flash[:notice] = "Transaction deleted"
            redirect_to period_path(current_period)
          end

          format.json do
            head :no_content, status: 204
          end
        end
      else
        format.html do
          flash[:error] = "Can't delete transaction: #{@transaction.errors.full_messages.to_sentence}"
          render :edit
        end

        format.json { render_unprocessable_entity }
      end
    else
      flash[:error] = "Can't delete transaction: period is closed"
      render :edit
    end
  end

  def index
    respond_to do |format|
      format.html do
        @account = Account.find(params[:account_id]) if params[:account_id]
        @transactions = period.transactions.order('created_at DESC')
      end

      format.csv do
        periods = Period.all.order(:created_at)
        @csv = CsvExport::Transactions.new(periods)
        headers['Content-Disposition'] = "attachment; filename=\"deharo-transactions.csv\""
        headers['Content-Type'] ||= 'text/csv'
      end

      format.json do
        @transactions = period.transactions.order('created_at DESC')
        render json: @transactions.to_json
      end
    end

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

  def render_unprocessable_entity
    render status: :unprocessable_entity, json: { errors: @transaction.errors.full_messages }
  end
end
