Deharo::Application.routes.draw do

  root to: 'periods#current'

  resources :periods, only: [:show, :index, :update] do
    resources :transactions, except: [:show, :index]

    member do
      put :close
    end
  end

  resources :accounts, only: [:index, :update, :create, :edit]

end
