Deharo::Application.routes.draw do

  root to: 'periods#current'
  get '/help', to: 'pages#root'

  resources :periods, only: [:show, :index] do
    resources :transactions, only: [:index, :edit, :update]
    resources :accounts, only: [] do
      resources :transactions, only: [:index]
    end

    member do
      put :close
      get :detail
    end

    collection do
      get :current
    end
  end

  resources :accounts, only: [:index, :update, :create, :edit]
  resources :transactions, only: [:index, :new, :create, :destroy] do
    resource :transaction_preset, only: [:create, :destroy]
  end

  resources :transaction_presets, only: [:index]
end
