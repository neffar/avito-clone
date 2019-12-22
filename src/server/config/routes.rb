Rails.application.routes.draw do

  resources :users
  resources :tokens, only: [:create]
  api_version(:module => "V1", :path => {:value => "v1"}) do

    resources :articles
	   
	end  
end
