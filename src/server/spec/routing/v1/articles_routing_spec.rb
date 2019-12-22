require "rails_helper"

RSpec.describe V1::ArticlesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/v1/articles").to route_to("v1/articles#index")
    end

    it "routes to #show" do
      expect(:get => "/v1/articles/1").to route_to("v1/articles#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/v1/articles").to route_to("v1/articles#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/v1/articles/1").to route_to("v1/articles#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/v1/articles/1").to route_to("v1/articles#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/v1/articles/1").to route_to("v1/articles#destroy", :id => "1")
    end
  end
end
