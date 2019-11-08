Rails.application.routes.draw do
  get 'cups' => 'cups#index'
  post 'cups' => 'cups#create'
  get 'brews' => 'brews#index'
  get 'roasters' => 'roasters#index'
  post 'users' => 'users#create'
  post 'sessions' => 'sessions#create'

  resources :roasters, only: [:index] do
    resources :coffees, only: [:index]
  end
end
