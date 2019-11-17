Rails.application.routes.draw do
  get 'cups' => 'cups#index'
  get 'cups/:id' => 'cups#show'
  post 'cups' => 'cups#create'
  patch 'cups/:id' => 'cups#update'
  delete 'cups/:id' => 'cups#destroy'
  get 'brews' => 'brews#index'
  get 'roasters' => 'roasters#index'
  post 'users' => 'users#create'
  post 'sessions' => 'sessions#create'

  resources :roasters, only: [:index] do
    resources :coffees, only: [:index]
  end
end
