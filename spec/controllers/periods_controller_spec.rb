require 'spec_helper'

describe PeriodsController do
  let(:period) { Period.create! }

  describe "GET 'show'" do
    it "returns http success" do
      get 'show', id: period.id
      expect(response).to be_success
    end
  end

  describe "GET 'index'" do
    it "returns http success" do
      get 'index'
      expect(response).to be_success
    end
  end
end
