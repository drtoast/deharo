class TransactionPresetsController < ApplicationController
  before_action :set_transaction, except: [:index]

  def index
    respond_to do |format|
      format.html do
        @transaction_presets = TransactionPreset.all
      end

      format.json do
        transaction_presets = TransactionPreset.all.map(&:transaction_template)
        render json: transaction_presets
      end
    end
  end

  def create
    @transaction_preset = @transaction.build_transaction_preset

    if @transaction_preset.save
      redirect_to transaction_presets_path, notice: 'Preset added.'
    else
      redirect_to transaction_path, alert: 'Could not add preset.'
    end
  end

  def destroy
    if @transaction.transaction_preset
      @transaction.transaction_preset.destroy
      redirect_to transaction_presets_path, notice: 'Preset removed.'
    else
      redirect_to transaction_path, alert: 'Could not remove preset.'
    end
  end

  private

  def transaction_path
    edit_period_transaction_path(@transaction.period, @transaction)
  end

  def set_transaction
    @transaction = Transaction.find(params[:transaction_id])
  end
end
