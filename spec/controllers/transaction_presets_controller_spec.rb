require 'spec_helper'

describe TransactionPresetsController do

  let(:period) { Period.create! }
  let(:p1) { Account.create!(name: 'Person 1') }
  let(:p2) { Account.create!(name: 'Person 2') }
  let(:fp) { Account.create!(name: 'False Profit, LLC') }
  let(:shares) { { p1.id.to_s => 25, p2.id.to_s => 75 } }
  let(:transaction) { period.transactions.create!(account: fp, amount: 1000000, description: 'rent', shares: shares)}

  def valid_attributes
    { transaction_id: transaction.to_param }
  end

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # TransactionPresetsController. Be sure to keep this updated too.
  def valid_session
    {}
  end

  before do
    # TODO Set to :user and specify authorization rules in Ability.rb.
    # login_user build :admin
  end

  describe "#index" do
    it "assigns all transaction_presets as @transaction_presets" do
      transaction_preset = transaction.create_transaction_preset
      get :index, {}, valid_session
      expect(assigns(:transaction_presets)).to eq([transaction_preset])
    end
  end

  describe "#create" do
    describe "with valid params" do
      it "creates a new TransactionPreset" do
        expect {
          post :create, { transaction_id: transaction.to_param }, valid_session
        }.to change(TransactionPreset, :count).by(1)
      end

      it "assigns a newly created transaction_preset as @transaction_preset" do
        post :create, { transaction_id: transaction.to_param }, valid_session
        expect(assigns(:transaction_preset)).to be_a(TransactionPreset)
        expect(assigns(:transaction_preset)).to be_persisted
      end

      it "redirects to the presets list" do
        post :create, { :transaction_id => transaction.to_param }, valid_session
        expect(response).to redirect_to(transaction_presets_path)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved transaction_preset as @transaction_preset" do
        # Trigger the behavior that occurs when invalid params are submitted
        TransactionPreset.any_instance.stub(:save).and_return(false)
        post :create, { transaction_id: transaction.to_param }, valid_session
        expect(assigns(:transaction_preset)).to be_a_new(TransactionPreset)
      end

      it "redirects to the transaction" do
        # Trigger the behavior that occurs when invalid params are submitted
        TransactionPreset.any_instance.stub(:save).and_return(false)
        post :create, { transaction_id: transaction.to_param }, valid_session
        expect(response).to redirect_to(edit_period_transaction_path(period, transaction))
      end
    end
  end


  describe "#destroy" do
    it "destroys the requested transaction_preset" do
      transaction_preset = transaction.create_transaction_preset
      expect {
        delete :destroy, { transaction_id: transaction.to_param }, valid_session
      }.to change(TransactionPreset, :count).by(-1)
    end

    it "redirects to the transaction" do
      transaction_preset = transaction.create_transaction_preset
      delete :destroy, { transaction_id: transaction.to_param }, valid_session
      expect(response).to redirect_to(transaction_presets_path)
    end
  end

end
